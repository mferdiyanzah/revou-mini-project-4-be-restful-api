import { type RowDataPacket, type ResultSetHeader } from "mysql2";

import pool from "../libs/db";
import { type UpdateMovieShowRequest, type MovieShowRequest } from "../models/movie-show.model";

const getShowTimeById = async (showTimeId: number): Promise<MovieShowRequest> => {
  const query = `
    SELECT * FROM movie_shows
    WHERE id = ?;
  `;
  const values = [showTimeId];

  const [results] = await pool.query<RowDataPacket[]>(query, values);
  return results[0] as MovieShowRequest;
};

const addShowTime = async (addShowTimeRequest: MovieShowRequest): Promise<number> => {
  const { movie_id, price, show_time } = addShowTimeRequest;

  const query = `
    INSERT INTO movie_shows 
      (movie_id, price, show_time, status)
    VALUES 
      (?, ?, ?, 'upcoming');
  `;
  const values = [movie_id, price, show_time];

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

const updateShowTime = async (updateMovieShowRequest: UpdateMovieShowRequest): Promise<number> => {
  let query = 'UPDATE movie_shows SET ';
  const values: any[] = [];

  for (const key in updateMovieShowRequest) {
    if (key === 'id') continue;
    if (Object.prototype.hasOwnProperty.call(updateMovieShowRequest, key)) {
      query += `${key} = ?, `;
      values.push(updateMovieShowRequest[key as keyof UpdateMovieShowRequest]);
    }
  }

  query = query.slice(0, -2);

  query += ' WHERE id = ?;';
  values.push(updateMovieShowRequest.id);

  const [result] = await pool.query<ResultSetHeader>(query, values);
  return result.affectedRows;
};

const checkTimeAvailability = async (showTime: string): Promise<boolean> => {
  const startTime = new Date(showTime);
  startTime.setHours(startTime.getHours() - 3);

  const query = `
    SELECT * FROM movie_shows
    WHERE show_time BETWEEN ? AND ?;
  `;
  const values = [startTime, showTime];

  const [results] = await pool.query<RowDataPacket[]>(query, values);

  return results.length === 0;
};

const updateShowTimeNowPlaying = async (): Promise<number> => {
  const query = `
    UPDATE movie_shows
    SET status = 'now_showing'
    WHERE show_time > DATE_SUB(NOW(), INTERVAL 1 DAY) and status = 'upcoming';
  `;

  const [result] = await pool.query<ResultSetHeader>(query);
  return result.affectedRows;
};

const updateShowTimeFinished = async (): Promise<number> => {
  const query = `
    UPDATE movie_shows
    SET status = 'finished'
    WHERE show_time < NOW();
  `;

  const [result] = await pool.query<ResultSetHeader>(query);
  return result.affectedRows;
};


const movieShowTimeRepository = {
  addShowTime,
  deleteShowTime,
  updateShowTime,
  checkTimeAvailability,
  updateShowTimeNowPlaying,
  updateShowTimeFinished,
  getShowTimeById
};

export default movieShowTimeRepository;