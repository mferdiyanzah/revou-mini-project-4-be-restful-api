import { type ResultSetHeader, type RowDataPacket } from "mysql2";

import pool from "../libs/db";
import { type GenericPaginationRequest } from "../models/generic.model";
import {
  type UpdateMovieRequest,
  type AddMovieRequest,
  type GetAllMoviesNowPlayingQueryResult,
  type GetAllMoviesResponse,
  type MovieModel,
  type AddMovieActorRequest,
  type MovieDetailQueryResponse,
} from "../models/movie.model";

const getMovies = async (
  request: GenericPaginationRequest
): Promise<GetAllMoviesResponse> => {
  const query = `
    SELECT * FROM movies
    WHERE deleted_at IS NULL AND title LIKE ${pool.escape(`%${request.search}%`)}
    ${request.sort != null && request.order != null ? `ORDER BY ${request.sort} ${request.order}` : ""}
    LIMIT ? OFFSET ?;
  `;
  const values = [request.limit, request.offset];

  const [results] = await pool.query<RowDataPacket[]>(query, values);

  const movies: MovieModel[] = results.map((result) => {
    return {
      id: result.id,
      title: result.title,
      release_date: result.release_date,
      director: result.director,
      genre: result.genre,
      duration: result.duration,
      rating: result.rating,
      overview: result.overview,
    };
  });

  const data: GetAllMoviesResponse = {
    results: movies,
    page: request.offset + 1,
    limit: request.limit,
  };

  return data;
};

const getMovieById = async (id: string): Promise<MovieDetailQueryResponse[]> => {
  const query = `
    SELECT m.title,
      m.overview,
      m.duration,
      m.director,
      m.genre,
      m.rating,
      m.release_date,
      a.name as actor
    FROM movies m
      JOIN movie_casts mc ON m.id = mc.movie_id
      JOIN actors a ON mc.actor_id = a.id
    WHERE m.id = 1 AND m.deleted_at IS NULL;
  `;

  const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);

  return rows as MovieDetailQueryResponse[];
};

const addMovieActors = async ({ movie_id, actor_id }: AddMovieActorRequest): Promise<void> => {
  const checkActorQuery = `
    SELECT id FROM actors WHERE id = ?;
  `;
  const checkActorValues = [actor_id];

  const [checkActor] = await pool.query<RowDataPacket[]>(checkActorQuery, checkActorValues);

  if (checkActor.length === 0) {
    throw new Error("Actor not found");
  }

  const query = `
    INSERT INTO movie_casts (movie_id, actor_id)
    VALUES (?, ?);
  `;

  const values = [movie_id, actor_id];

  await pool.query<ResultSetHeader>(query, values);
};

const addNewMovie = async (movie: AddMovieRequest): Promise<number> => {
  const query = `
    INSERT INTO movies (title, release_date, director, genre, duration, rating, overview)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;
  const values = [
    movie.title,
    movie.release_date,
    movie.director,
    movie.genre,
    movie.duration,
    movie.rating,
    movie.overview,
  ];

  const [result] = await pool.query<ResultSetHeader>(query, values);
  const movieId = result.insertId;

  await Promise.all(
    movie.actors.map(async (actor) => {
      const newActor = { movie_id: movieId, actor_id: actor };
      await addMovieActors(newActor);
    }),
  );

  return movieId;
};

const getMoviesNowPlaying = async (): Promise<GetAllMoviesNowPlayingQueryResult[]> => {
  const query = `
    SELECT 
      m.id,
      ms.id as show_time_id,
      ms.show_time,
      m.title, 
      m.rating, 
      m.release_date, 
      m.director, 
      m.genre, 
      m.overview 
    FROM movie_shows ms
    JOIN movies m ON ms.movie_id = m.id
    WHERE ms.show_time >= NOW() AND m.deleted_at IS NULL;
  `;

  const [results] = await pool.query<RowDataPacket[]>(query);

  return results as GetAllMoviesNowPlayingQueryResult[];
};

const updateMovieById = async (id: string, movie: UpdateMovieRequest): Promise<number> => {
  const query = `
    UPDATE movies
    SET title = ?, release_date = ?, director = ?, genre = ?, duration = ?, rating = ?, overview = ?
    WHERE id = ?;
  `;

  const values = [
    movie.title,
    movie.release_date,
    movie.director,
    movie.genre,
    movie.duration,
    movie.rating,
    movie.overview,
    id,
  ];

  const [result] = await pool.query<ResultSetHeader>(query, values);
  return result.affectedRows;
};

const deleteMovieById = async (id: string): Promise<number> => {
  const query = `
    UPDATE movies
    SET deleted_at = NOW()
    WHERE id = ?;
  `;

  const [result] = await pool.query<ResultSetHeader>(query, [id]);
  return result.affectedRows;
};

const movieRepository = {
  getMovies,
  getMovieById,
  getMoviesNowPlaying,
  addNewMovie,
  updateMovieById,
  deleteMovieById,
};

export default movieRepository;
