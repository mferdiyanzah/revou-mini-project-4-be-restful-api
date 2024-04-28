import { type RowDataPacket, type ResultSetHeader } from "mysql2";

import pool from "../libs/db";
import {
  type BookingHistory, type AddBookingRequest, type BookingModel
} from "../models/booking.model";

const addBooking = async (booking: AddBookingRequest): Promise<number> => {
  const query = `
    INSERT INTO 
      bookings (booking_code, user_id, showtime_seat_id, status)
    VALUES 
      (?, ?, ?, 'pending');
  `;
  const values = [booking.booking_code, booking.user_id, booking.showtime_seat_id];

  const [result] = await pool.query<ResultSetHeader>(query, values);
  return result.insertId;
};

const getBookingByCode = async (bookingCode: string): Promise<BookingModel> => {
  const query = `
    SELECT * FROM bookings WHERE booking_code = ?;
  `;
  const values = [bookingCode];

  const [result] = await pool.query<RowDataPacket[]>(query, values);
  return result[0] as BookingModel;
};

const updateBookingStatus = async (bookingId: string, status: string): Promise<number> => {
  const query = `
    UPDATE bookings
    SET status = ?
    WHERE booking_code = ?;
  `;
  const values = [status, bookingId];

  const [result] = await pool.query<ResultSetHeader>(query, values);
  return result.affectedRows;
};

const getBookingHistory = async (userId: string): Promise<BookingHistory[]> => {
  const query = `
    SELECT 
      b.id,
      b.booking_code,
      m.title,
      s.show_time,
      s.price,
      bs.seat_number,
      b.status
    FROM bookings b
    INNER JOIN showtime_seats ss ON b.showtime_seat_id = ss.id
    INNER JOIN movie_shows s ON ss.movie_show_id = s.id
    INNER JOIN movies m ON s.movie_id = m.id
    INNER JOIN seats bs ON ss.seat_id = bs.id
    WHERE b.user_id = ?;
  `;
  const values = [userId];

  const [results] = await pool.query<RowDataPacket[]>(query, values);

  const bookings: BookingHistory[] = results.map((result) => {
    return {
      id: result.id,
      booking_code: result.booking_code,
      movie_title: result.title,
      show_time: result.show_time,
      price: result.price,
      seat_number: result.seat_number,
      status: result.status,
    };
  });

  return bookings;
};

const updateExpiredBooking = async (): Promise<number> => {
  const query = `
    UPDATE bookings
    SET status = 'expired'
    WHERE status = 'pending' AND created_at < NOW() - INTERVAL 15 MINUTE;
  `;

  const [result] = await pool.query<ResultSetHeader>(query);
  return result.affectedRows;
};

const bookingRepository = {
  addBooking,
  updateBookingStatus,
  getBookingHistory,
  updateExpiredBooking,
  getBookingByCode,
};

export default bookingRepository;