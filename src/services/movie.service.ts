import {
  type AddMovieRequest,
  type GetAllMoviesResponse,
  type MovieModel,
} from "../models/movie.model";
import { movieRepository } from "../repositories";

const getMovies = async (
  limit: number,
  offset: number,
  order: string,
  sort: string,
): Promise<GetAllMoviesResponse> => {
  const offsetValue = limit * (offset - 1);

  return await movieRepository.getMovies(limit, offsetValue, order, sort);
};

const getMovieById = async (id: string): Promise<MovieModel> => {
  return await movieRepository.getMovieById(id);
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
      acc[result.id] = { title, release_date, director, genre, duration, rating, overview, show_time: [showTime] };
    } else {
      acc[result.id].show_time.push(showTime);
    }
    console.log(acc);
    return acc;
  }, {}));

  return movies;
};

const movieService = {
  getMovies,
  getMovieById,
  getMoviesNowPlaying,
  addNewMovie,
};

export default movieService;
