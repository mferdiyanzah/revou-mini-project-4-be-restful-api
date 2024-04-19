import { type RowDataPacket } from "mysql2";

import connection from "../libs/db";
import { type GetAllSeatsResponse } from "../models/seat.model";

const getAllSeats = async (): Promise<GetAllSeatsResponse> => {
  return await new Promise((resolve, reject) => {
    const query = `
      SELECT id FROM seats;
    `;

    connection.query<RowDataPacket[]>(query, (err, results) => {
      if (err != null) {
        reject(err);
      }

      const seats: GetAllSeatsResponse = results.map((result) => {
        return { id: result.id, };
      });

      resolve(seats);
    });
  });
};

const seatRepository = { getAllSeats, };

export default seatRepository;