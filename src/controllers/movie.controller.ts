import { type Request, type Response } from "express";

import { type GenericPaginationRequest } from "../models/generic.model";
import { type UpdateMovieRequest, type AddMovieRequest } from "../models/movie.model";
import { movieService } from "../services";
import { validateRequest } from "../utils/global";
import responseHandler from "../utils/response-handler";

const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, limit, page, order, sort } = req.query as {
      search: string;
      limit: string;
      page: string;
      order: string;
      sort: string;
    };

    const limitNumber = Number(limit);
    const pageNumber = Number(page);

    if (isNaN(limitNumber) || isNaN(pageNumber)) {
      responseHandler(res, 400, "Invalid limit or page", false);
      return;
    }

    if (limit == null || page == null) {
      const data = {
        results: [],
        page: 1,
        limit: 0,
      };
      responseHandler(res, 200, "OK", true, data);
      return;
    }

    const getMovieRequest: GenericPaginationRequest = {
      search,
      limit: limitNumber,
      offset: pageNumber,
      order,
      sort,
    };

    const movies = await movieService.getMovies(getMovieRequest);

    responseHandler(res, 200, "OK", true, movies);
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er?.message, false);
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
    const addMovieRequest: AddMovieRequest = req.body;
    const requiredKeys = ["title", "release_date", "director", "genre", "duration", "rating", "overview", "actors"];
    const isRequestValid = validateRequest(requiredKeys, addMovieRequest);

    if (!isRequestValid) {
      throw new Error("All fields are required");
    }

    const movieId = await movieService.addNewMovie(addMovieRequest);

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

    responseHandler(res, 200, "OK", true, movies);
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
};

const updateMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie: UpdateMovieRequest = req.body;

    const isRequestValid = Object.values(movie).some((value) => value === undefined);
    if (isRequestValid) {
      throw new Error("All fields are required");
    }

    const { id } = req.params;

    await movieService.updateMovieById(id, movie);

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
