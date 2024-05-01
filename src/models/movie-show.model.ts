interface MovieShowModel {
  id: number;
  show_time: string;
}

interface MovieShowRequest {
  movie_id: number;
  price: number;
  show_time: string;
  status: 'upcoming' | 'now_showing' | 'finished';
}

interface UpdateMovieShowRequest extends MovieShowRequest {
  id: number;
}

export type {
  MovieShowModel, MovieShowRequest, UpdateMovieShowRequest
};