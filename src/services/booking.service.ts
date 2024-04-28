import shortId from "shortid";

import pool from "../libs/db";
import {
  type BookingHistory, type AddBookingPayload, type UpdateBookingStatusRequest
} from "../models/booking.model";
import { showTimeSeatRepository } from "../repositories";
import bookingRepository from "../repositories/booking.repository";

const addBooking = async (bookingPayload: AddBookingPayload): Promise<string> => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const isSeatAvailable = await showTimeSeatRepository.checkSeatAvailability(bookingPayload.showtime_seat_id);

    if (!isSeatAvailable) {
      throw new Error("Seat is not available");
    }

    await showTimeSeatRepository.updateShowTimeSeat(bookingPayload.showtime_seat_id, "booked");

    const bookingId = shortId.generate();
    const booking = { ...bookingPayload, booking_code: bookingId, };

    await bookingRepository.addBooking(booking);

    await connection.commit();

    return String(bookingId);
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

const updateBookingStatus = async (updateBookingStatusRequest: UpdateBookingStatusRequest): Promise<number> => {
  const { bookingId, status, userId } = updateBookingStatusRequest;

  const booking = await bookingRepository.getBookingByCode(bookingId);
  if (booking === undefined) throw new Error("Booking not found");
  if (booking.user_id !== userId) throw new Error("Unauthorized access");
  if (booking.status === "confirmed") throw new Error("Booking already confirmed");
  if (booking.created_at < new Date(Date.now() - 15 * 60 * 1000)) throw new Error("Booking expired");

  const result = await bookingRepository.updateBookingStatus(bookingId, status);
  return result;
};


const getBookingHistory = async (userId: string): Promise<BookingHistory[]> => {
  const bookings = await bookingRepository.getBookingHistory(userId);
  return bookings;
};

const updateExpiredBooking = async (): Promise<number> => {
  const result = await bookingRepository.updateExpiredBooking();
  return result;
};

const bookingService = {
  addBooking, updateBookingStatus, getBookingHistory, updateExpiredBooking,
};

export default bookingService;