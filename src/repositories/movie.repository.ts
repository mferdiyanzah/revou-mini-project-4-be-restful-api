import { type ResultSetHeader, type RowDataPacket } from "mysql2";

import connection from "../libs/db";
import {
  type UpdateMovieRequest,
  type AddMovieRequest,
  type GetAllMoviesNowPlayingQueryResult,
  type GetAllMoviesResponse,
  type MovieModel,
} from "../models/movie.model";

const getMovies = async (
  limit: number,
  offset: number,
  order?: string,
  sort?: string,
): Promise<GetAllMoviesResponse> => {
  return await new Promise((resolve, reject) => {
    let query = `
      SELECT * FROM movies
      WHERE deleted_at IS NULL
    `;

    const values = [limit, offset];

    if (sort != null && order != null) {
      query += `ORDER BY ${sort} ${order} `;
    }

    query += `LIMIT ? OFFSET ?;`;

    connection.query<RowDataPacket[]>(query, values, (err, results) => {
      if (err != null) {
        reject(err);
      };

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
        page: offset + 1,
        limit,
      };

      resolve(data);
    });
  });
};

const getMovieById = async (id: string): Promise<MovieModel> => {
  return await new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM movies WHERE id = ? AND deleted_at IS NULL
    `;

    connection.query<RowDataPacket[]>(query, [id], (err, results) => {
      if (err !== null) {
        reject(err);
      }

      if (results.length === 0) {
        reject(new Error("Movie not found"));
      }

      const movie = results[0] as MovieModel;

      resolve(movie);
    });
  });
};

const addMovieActors = async (movieId: number, actorId: number): Promise<void> => {
  const checkActorQuery = `
    SELECT id FROM actors WHERE id = ?;
  `;
  const checkActorValues = [actorId];

  const checkActor = await Promise.all([
    new Promise((resolve, reject) => {
      connection.query<RowDataPacket[]>(checkActorQuery, checkActorValues, (err, res) => {
        if (err !== null) {
          reject(err);
        }

        resolve(res.length > 0);
      });
    }),
  ]);

  if (checkActor[0] === false || checkActor[0] === undefined) {
    throw new Error("Actor not found");
  }

  await new Promise<void>((resolve, reject) => {
    const query = `
      INSERT INTO movie_casts (movie_id, actor_id)
      VALUES (?, ?);
    `;

    const values = [movieId, actorId];

    connection.query<ResultSetHeader>(query, values, (err, res) => {
      if (err !== null) {
        reject(err);
      }
      resolve();
    });
  });
};

const addNewMovie = async (movie: AddMovieRequest): Promise<number> => {
  return await new Promise((resolve, reject) => {
    const insertMovieQuery = `
      INSERT INTO movies (title, release_date, director, genre, duration, rating, overview)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const insertMovieValues = [
      movie.title,
      movie.release_date,
      movie.director,
      movie.genre,
      movie.duration,
      movie.rating,
      movie.overview,
    ];

    connection.query<ResultSetHeader>(
      insertMovieQuery,
      insertMovieValues,
      async (err, results) => {
        if (err !== null) {
          reject(err);
        }

        const movieId = results.insertId;

        try {
          await Promise.all(
            movie.actors.map(async (actor) => { await addMovieActors(movieId, actor); }),
          );
          resolve(movieId);
        } catch (er) {
          reject(er);
        }
      },
    );
  });
};

const getMoviesNowPlaying = async (): Promise<GetAllMoviesNowPlayingQueryResult[]> => {
  return await new Promise((resolve, reject) => {
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
      WHERE ms.show_time >= NOW() AND m.deleted_at IS NULL
    `;

    connection.query<RowDataPacket[]>(query, (err, results) => {
      if (err != null) {
        reject(err);
      }

      resolve(results as GetAllMoviesNowPlayingQueryResult[]);
    });
  });
};

const updateMovieById = async (id: string, movie: UpdateMovieRequest): Promise<number> => {
  return await new Promise((resolve, reject) => {
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

    connection.query<ResultSetHeader>(query, values, (err, result) => {
      if (err !== null) {
        reject(err);
      }
      resolve(result.insertId);
    });
  });
};

const deleteMovieById = async (id: string): Promise<number> => {
  return await new Promise((resolve, reject) => {
    const query = `
      UPDATE movies
      SET deleted_at = NOW()
      WHERE id = ?;
    `;

    connection.query<ResultSetHeader>(query, [id], (err, result) => {
      if (err !== null) {
        reject(err);
      }
      resolve(result.affectedRows);
    });
  });
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
