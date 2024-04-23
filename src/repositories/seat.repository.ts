import { type RowDataPacket } from "mysql2";

import pool from "../libs/db";
import { type GetAllSeatsResponse } from "../models/seat.model";

const getAllSeats = async (): Promise<GetAllSeatsResponse> => {
  const query = `
    SELECT id FROM seats;
  `;

  const [results] = await pool.query<RowDataPacket[]>(query);

  const seats: GetAllSeatsResponse = results.map((result) => {
    return { id: result.id, };
  });

  return seats;
};

const getAvailableSeats = async (showTimeId: string): Promise<GetAllSeatsResponse> => {
  const query = `
    SELECT 
      seat_number,
      ss.status
    FROM seats s
    INNER JOIN showtime_seats ss ON s.id = ss.seat_id
    WHERE ss.movie_show_id = ?
      AND ss.status = 'available';
  `;

  const [results] = await pool.query<RowDataPacket[]>(query, [showTimeId]);

  const seats: GetAllSeatsResponse = results.map((result) => {
    return { id: result.id, };
  });

  return seats;
};

const seatRepository = { getAllSeats, getAvailableSeats };

export default seatRepository;