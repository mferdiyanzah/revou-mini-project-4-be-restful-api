import { type Request, type Response } from "express";

import { type UpdateMovieRequest, type AddMovieRequest } from "../models/movie.model";
import { movieService } from "../services";
import responseHandler from "../utils/response-handler";

const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit, page, order, sort } = req.query;

    if (limit == null || page == null) {
      const data = {
        results: [],
        page: 1,
        limit: 0,
      };
      responseHandler(res, 200, "OK", true, data);
      return;
    }

    const movies = await movieService.getMovies(
      parseInt(limit as string),
      parseInt(page as string),
      sort as string,
      order as string,
    );

    responseHandler(res, 200, "OK", true, movies);
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
};

const getMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const movie = await movieService.getMovieById(id);

    responseHandler(res, 200, "OK", true, movie);
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
};

const addNewMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = req.body;

    const movieId = await movieService.addNewMovie(movie as AddMovieRequest);

    responseHandler(res, 201, "Created", true, { id: movieId });
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
};

const getMoviesNowPlaying = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies = await movieService.getMoviesNowPlaying();
    console.log(movies);

    responseHandler(res, 200, "OK", true, movies);
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
};

const updateMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = req.body;

    const { id } = req.params;

    await movieService.updateMovieById(id, movie as UpdateMovieRequest);

    responseHandler(res, 200, "OK", true);
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
};

const deleteMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await movieService.deleteMovieById(id);

    responseHandler(res, 200, "OK", true);
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
};

const movieController = {
  getMovies,
  getMovieById,
  getMoviesNowPlaying,
  addNewMovie,
  updateMovieById,
  deleteMovieById,
};

export default movieController;
