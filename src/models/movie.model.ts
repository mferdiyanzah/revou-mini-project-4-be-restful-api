import { type GenericPaginationResponse } from "./generic.model";
import { type MovieShowModel } from "./movie-show.model";

interface MovieModel {
  id: string;
  title: string;
  release_date: string;
  director: string;
  genre: string;
  duration: number;
  rating: string;
  overview: string;
};

interface MovieDetailQueryResponse extends MovieModel {
  actor: string;
};

interface MovieDetailResponse extends MovieModel {
  actors: string[];
};

interface GetAllMoviesQuery {
  limit: number;
  page: number;
  order: string;
  sort: "asc" | "desc";
}

interface GetAllMoviesResponse extends GenericPaginationResponse<MovieModel> { };

interface AddMovieRequest {
  title: string;
  release_date: string;
  director: string;
  genre: string;
  duration: number;
  rating: string;
  overview: string;
  actors: number[];
};

interface GetAllMoviesNowPlayingQueryResult extends MovieModel {
  show_time: string;
  show_time_id: number;
};

interface GetAllMoviesNowPlayingResponse extends MovieModel {
  show_time: MovieShowModel[];
};

interface UpdateMovieRequest extends AddMovieRequest { }

interface AddMovieActorRequest {
  actor_id: number;
  movie_id: number;
}

export type {
  AddMovieRequest, GetAllMoviesNowPlayingQueryResult,
  GetAllMoviesNowPlayingResponse, GetAllMoviesQuery,
  GetAllMoviesResponse, MovieDetailResponse, MovieModel,
  UpdateMovieRequest, AddMovieActorRequest, MovieDetailQueryResponse
};

