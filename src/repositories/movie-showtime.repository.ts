import { type RowDataPacket, type ResultSetHeader } from "mysql2";

import pool from "../libs/db";
import { type UpdateMovieShowRequest, type MovieShowRequest } from "../models/movie-show.model";

const addShowTime = async (request: MovieShowRequest): Promise<number> => {
  const query = `
    INSERT INTO movie_shows 
      (movie_id, price, show_time, status)
    VALUES 
      (?, ?, ?, 'upcoming');
  `;
  const values = [request.movie_id, request.price, request.show_time];
  console.log(values, request);

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
  console.log(query, values);

  const [result] = await pool.query<ResultSetHeader>(query, values);
  console.log(result);
  return result.affectedRows;
};

const checkTimeAvailability = async (showTime: string): Promise<boolean> => {
  const endTime = new Date(showTime);
  endTime.setHours(endTime.getHours() + 2);

  const query = `
    SELECT * FROM movie_shows
    WHERE show_time BETWEEN ? AND ?;
  `;
  const values = [showTime, endTime];

  const [results] = await pool.query<RowDataPacket[]>(query, values);

  return results.length === 0;
};

const updateShowTimeNowPlaying = async (): Promise<number> => {
  const query = `
    UPDATE movie_shows
    SET status = 'now_playing'
    WHERE show_time < NOW() AND show_time > DATE_SUB(NOW(), INTERVAL 30 MINUTE);
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
};

export default movieShowTimeRepository;