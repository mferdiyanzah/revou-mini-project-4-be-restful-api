import pool from "../libs/db";
import { type UpdateMovieShowRequest, type MovieShowRequest } from "../models/movie-show.model";
import { type AddShowTimeSeatRequest } from "../models/showtime-seat.model";
import {
  movieShowTimeRepository, seatRepository, showTimeSeatRepository
} from "../repositories";

const addShowTime = async (request: MovieShowRequest): Promise<boolean> => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const newMovieShow: MovieShowRequest = {
      movie_id: request.movie_id,
      price: request.price,
      show_time: request.show_time,
      status: "upcoming",
    };

    const showTimeId = await movieShowTimeRepository.addShowTime(newMovieShow);

    const seats = await seatRepository.getAllSeats();

    for (const seat of seats) {
      const showTimeSeat: AddShowTimeSeatRequest = {
        movie_show_id: showTimeId,
        seat_id: seat.id,
        status: "available",
      };
      await showTimeSeatRepository.addShowTimeSeat(showTimeSeat);
    }

    await connection.commit();

    return true;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

const deleteShowTime = async (showTimeId: string): Promise<number> => {
  return await movieShowTimeRepository.deleteShowTime(showTimeId);
};

const updateShowTime = async (request: UpdateMovieShowRequest): Promise<number> => {
  return await movieShowTimeRepository.updateShowTime(request);
};

const movieShowTimeService = {
  addShowTime,
  deleteShowTime,
  updateShowTime,
};

export default movieShowTimeService;