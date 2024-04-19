import { type AddShowTimeSeatRequest } from "../models/showtime-seat.model";
import {
  movieShowTimeRepository, seatRepository, showTimeSeatRepository
} from "../repositories";

const addShowTime = async (movieId: string, price: number, showTime: string): Promise<boolean> => {
  const showTimeId = await movieShowTimeRepository.addShowTime(movieId, price, showTime);

  const seats = await seatRepository.getAllSeats();

  try {
    for (const seat of seats) {
      const showTimeSeat: AddShowTimeSeatRequest = {
        movie_show_id: showTimeId,
        seat_id: seat.id,
        status: "available",
      };

      await showTimeSeatRepository.addShowTimeSeat(showTimeSeat);
    }
    return true;
  } catch (error) {
    return false;
  }
};

const deleteShowTime = async (showTimeId: string): Promise<number> => {
  return await movieShowTimeRepository.deleteShowTime(showTimeId);
};

const updateShowTime = async (showTimeId: string, price: number, showTime: string, totalSeats: number): Promise<number> => {
  return await movieShowTimeRepository.updateShowTime(showTimeId, price, showTime, totalSeats);
};

const movieShowTimeService = {
  addShowTime,
  deleteShowTime,
  updateShowTime,
};

export default movieShowTimeService;