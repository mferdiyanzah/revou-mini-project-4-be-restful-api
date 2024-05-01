import { type GenericPaginationRequest } from "../models/generic.model";
import {
  type AddMovieRequest,
  type GetAllMoviesResponse,
  type MovieDetailResponse,
  type UpdateMovieRequest
} from "../models/movie.model";
import { movieRepository } from "../repositories";

const getMovies = async (
  request: GenericPaginationRequest
): Promise<GetAllMoviesResponse> => {
  request.offset = request.limit * (request.offset - 1);

  return await movieRepository.getMovies(request);
};

const getMovieById = async (id: string): Promise<MovieDetailResponse> => {
  const movies = await movieRepository.getMovieById(id);
  if (movies.length === 0) {
    throw new Error("Movie not found");
  }

  const movie: MovieDetailResponse = {
    id: movies[0].id,
    title: movies[0].title,
    release_date: movies[0].release_date,
    director: movies[0].director,
    genre: movies[0].genre,
    duration: movies[0].duration,
    rating: movies[0].rating,
    overview: movies[0].overview,
    actors: movies.map((movie) => movie.actor),
  };

  return movie;
};

const addNewMovie = async (movie: AddMovieRequest): Promise<number> => {
  return await movieRepository.addNewMovie(movie);
};

const getMoviesNowPlaying = async (): Promise<GetAllMoviesResponse[]> => {
  const results = await movieRepository.getMoviesNowPlaying();

  const movies = Object.values(results.reduce((acc: Record<string, any>, result) => {
    const { title, release_date, director, genre, duration, rating, overview } = result;
    const showTime = { id: result.id, show_time: result.show_time };
    if (acc[result.id] == null) {
      acc[result.id] = {
        title, release_date, director, genre, duration, rating, overview, show_time: [showTime]
      };
    } else {
      acc[result.id].show_time.push(showTime);
    }
    return acc;
  }, {}));

  return movies;
};

const updateMovieById = async (id: string, updateMovieRequest: UpdateMovieRequest): Promise<void> => {
  const movie = await movieRepository.getMovieById(id);
  if (movie.length === 0) throw new Error("Movie not found");

  await movieRepository.updateMovieById(id, updateMovieRequest);
};

const deleteMovieById = async (id: string): Promise<void> => {
  const movie = await movieRepository.getMovieById(id);
  if (movie.length === 0) throw new Error("Movie not found");

  await movieRepository.deleteMovieById(id);
};

const movieService = {
  getMovies,
  getMovieById,
  getMoviesNowPlaying,
  addNewMovie,
  deleteMovieById,
  updateMovieById,
};

export default movieService;
