import pool from "../libs/db";
import { type UpdateMovieShowRequest, type MovieShowRequest } from "../models/movie-show.model";
import { type AddShowTimeSeatRequest } from "../models/showtime-seat.model";
import {
  movieShowTimeRepository, seatRepository, showTimeSeatRepository
} from "../repositories";

const addShowTime = async (request: MovieShowRequest): Promise<number> => {
  const connection = await pool.getConnection();
  const { show_time } = request;

  try {
    await connection.beginTransaction();

    const isTimeAvailable = await movieShowTimeRepository.checkTimeAvailability(show_time);

    if (!isTimeAvailable) {
      throw new Error("Show time is not available");
    }

    const showTimeId = await movieShowTimeRepository.addShowTime(request);

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

    return showTimeId;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

const deleteShowTime = async (showTimeId: string): Promise<number> => {
  const showTime = await movieShowTimeRepository.getShowTimeById(parseInt(showTimeId));

  if (showTime === undefined) throw new Error("Show time not found");

  return await movieShowTimeRepository.deleteShowTime(showTimeId);
};

const updateShowTime = async (request: UpdateMovieShowRequest): Promise<number> => {
  const { id } = request;
  const showTime = await movieShowTimeRepository.getShowTimeById(id);

  if (showTime === undefined) throw new Error("Show time not found");
  if (showTime.status === 'finished') throw new Error("Show time is finished");

  return await movieShowTimeRepository.updateShowTime(request);
};

const updateShowTimeFinished = async (): Promise<number> => {
  return await movieShowTimeRepository.updateShowTimeFinished();
};

const updateShowTimeNowPlaying = async (): Promise<number> => {
  return await movieShowTimeRepository.updateShowTimeNowPlaying();
};

const movieShowTimeService = {
  addShowTime,
  deleteShowTime,
  updateShowTime,
  updateShowTimeFinished,
  updateShowTimeNowPlaying,
};

export default movieShowTimeService;