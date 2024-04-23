import {
  type ResultSetHeader,
  type RowDataPacket
} from "mysql2";

import pool from "../libs/db";
import { type AddShowTimeSeatRequest, type ShowTimeSeatModel } from "../models/showtime-seat.model";

const addShowTimeSeat = async (showTimeSeat: AddShowTimeSeatRequest): Promise<number> => {
  const query = `
    INSERT INTO showtime_seats (movie_show_id, seat_id, status)
    VALUES (?, ?, ?);
  `;
  const values = [showTimeSeat.movie_show_id, showTimeSeat.seat_id, showTimeSeat.status];

  const [result] = await pool.query<ResultSetHeader>(query, values);
  return result.insertId;
};

const updateShowTimeSeat = async (showTimeSeatId: number, status: ShowTimeSeatModel["status"]): Promise<number> => {
  const query = `
    UPDATE showtime_seats
    SET status = ?
    WHERE id = ?;
  `;
  const values = [status, showTimeSeatId];

  const [result] = await pool.query<ResultSetHeader>(query, values);
  return result.affectedRows;
};

const checkSeatAvailability = async (showTimeSeatId: number): Promise<boolean> => {
  const query = `
    SELECT status
    FROM showtime_seats
    WHERE id = ?;
  `;
  const values = [showTimeSeatId];

  const [results] = await pool.query<RowDataPacket[]>(query, values);

  if (results.length === 0) {
    return false;
  }

  return results[0].status === "available";
};

const showTimeSeatRepository = {
  addShowTimeSeat,
  updateShowTimeSeat,
  checkSeatAvailability,
};

export default showTimeSeatRepository;