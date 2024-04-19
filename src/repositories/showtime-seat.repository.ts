import { type ResultSetHeader } from "mysql2";

import connection from "../libs/db";
import { type AddShowTimeSeatRequest, type ShowTimeSeatModel } from "../models/showtime-seat.model";

const addShowTimeSeat = async (showTimeSeat: AddShowTimeSeatRequest): Promise<number> => {
  return await new Promise((resolve, reject) => {
    const query = `
      INSERT INTO showtime_seats (movie_show_id, seat_id, status)
      VALUES (?, ?, ?);
    `;
    const values = [showTimeSeat.movie_show_id, showTimeSeat.seat_id, showTimeSeat.status];

    connection.query<ResultSetHeader>(query, values, (err, result) => {
      if (err !== null) {
        reject(err);
      }
      resolve(result.insertId);
    });
  });
};

const updateShowTimeSeat = async (showTimeSeatId: string, status: ShowTimeSeatModel["status"]): Promise<number> => {
  return await new Promise((resolve, reject) => {
    const query = `
      UPDATE showtime_seats
      SET status = ?
      WHERE id = ?;
    `;
    const values = [status, showTimeSeatId];

    connection.query<ResultSetHeader>(query, values, (err, result) => {
      if (err !== null) {
        reject(err);
      }
      resolve(result.affectedRows);
    });
  });
};

const showTimeSeatRepository = {
  addShowTimeSeat,
  updateShowTimeSeat,
};

export default showTimeSeatRepository;