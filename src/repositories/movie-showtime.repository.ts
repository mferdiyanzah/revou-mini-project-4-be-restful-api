import { type ResultSetHeader } from "mysql2";

import connection from "../libs/db";

const addShowTime = async (movieId: string, price: number, showTime: string): Promise<number> => {
  return await new Promise((resolve, reject) => {
    const query = `
      INSERT INTO movie_shows (movie_id, price, show_time)
      VALUES (?, ?, ?);
    `;
    const values = [movieId, price, showTime];

    connection.query<ResultSetHeader>(query, values, (err, result) => {
      if (err !== null) {
        reject(err);
      }
      console.log(result);
      resolve(result.insertId);
    });
  });
};

const deleteShowTime = async (showTimeId: string): Promise<number> => {
  return await new Promise((resolve, reject) => {
    const query = `
      UPDATE movie_shows
      SET deleted_at = NOW()
      WHERE id = ?;
    `;
    const values = [showTimeId];

    connection.query<ResultSetHeader>(query, values, (err, result) => {
      if (err !== null) {
        reject(err);
      }
      resolve(result.affectedRows);
    });
  });
};

const updateShowTime = async (showTimeId: string, price: number, showTime: string, totalSeats: number): Promise<number> => {
  return await new Promise((resolve, reject) => {
    const query = `
      UPDATE movie_shows
      SET 
        price = ?, 
        show_time = ?, 
        total_seats = ?,
        updated_at = NOW()
      WHERE id = ?;
    `;
    const values = [price, showTime, totalSeats, showTimeId];

    connection.query<ResultSetHeader>(query, values, (err, result) => {
      if (err !== null) {
        reject(err);
      }
      resolve(result.affectedRows);
    });
  });
};

const movieShowTimeRepository = {
  addShowTime,
  deleteShowTime,
  updateShowTime,
};

export default movieShowTimeRepository;