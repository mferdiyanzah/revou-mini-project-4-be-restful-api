import { type ResultSetHeader } from "mysql2";

import pool from "../libs/db";
import { type UpdateMovieShowRequest, type MovieShowRequest } from "../models/movie-show.model";

const addShowTime = async (request: MovieShowRequest): Promise<number> => {
  const query = `
    INSERT INTO movie_shows (movie_id, price, show_time, status)
    VALUES (?, ?, ?, 'upcoming');
  `;
  const values = [request.movie_id, request.price, request.show_time];

  const [result] = await pool.query<ResultSetHeader>(query, values);

  return result.insertId;
};

const deleteShowTime = async (showTimeId: string): Promise<number> => {
  const query =
    `UPDATE movie_shows
    SET deleted_at = NOW()
    WHERE id = ?;`;
  const values = [showTimeId];

  const [result] = await pool.query<ResultSetHeader>(query, values);
  return result.affectedRows;
};

const updateShowTime = async (request: UpdateMovieShowRequest): Promise<number> => {
  const query = `
    UPDATE movie_shows
    SET 
      price = ?, 
      show_time = ?, 
      status = ?,
      updated_at = NOW()
    WHERE id = ?;
  `;

  const values = [request.price, request.show_time, request.status, request.id];

  const [result] = await pool.query<ResultSetHeader>(query, values);
  return result.affectedRows;
};

const updateExpiredBookingSeat = async (id: number): Promise<number> => {
  const query = `
    UPDATE showtime_seats
    SET status = 'available'
    WHERE id = ?;
  `;
  const values = [id];

  const [result] = await pool.query<ResultSetHeader>(query, values);
  return result.affectedRows;
};

const movieShowTimeRepository = {
  addShowTime,
  deleteShowTime,
  updateShowTime,
  updateExpiredBookingSeat,
};

export default movieShowTimeRepository;