import { type Request, type Response } from 'express';

import { type JwtPayload } from 'jsonwebtoken';

import { bookingService } from '../services';
import { decodeToken } from '../utils/jwt';
import responseHandler from '../utils/response-handler';

const addBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { showtime_seat_id } = req.body;

    if (showtime_seat_id == null) {
      throw new Error("Showtime Seat ID is required");
    }

    const authHeader = req.headers.authorization ?? '';
    const decoded: JwtPayload | string = decodeToken(authHeader);

    const addBookingRequest = {
      user_id: decoded?.userId,
      showtime_seat_id,
    };

    const bookingId = await bookingService.addBooking(addBookingRequest);

    responseHandler(res, 201, "Created", true, { bookingId });
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
};

const updateBookingStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization ?? '';
    const decoded: JwtPayload | string = decodeToken(authHeader);

    const bookingId = req.params.bookingId;
    const status = "confirmed";

    const updateBookingStatusRequest = {
      userId: decoded?.userId,
      bookingId,
      status,
    };

    const result = await bookingService.updateBookingStatus(updateBookingStatusRequest);

    if (result === 0) {
      responseHandler(res, 200, "Booking not found", false);
      return;
    }

    responseHandler(res, 200, "OK", true);
  } catch (er) {
    if (er instanceof Error) {
      console.log(er);
      responseHandler(res, 400, er.message, false);
    }
  }
};

const getBookingHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization ?? '';
    const decoded: JwtPayload | string = decodeToken(authHeader);
    const userId = decoded?.userId as string;

    const bookings = await bookingService.getBookingHistory(userId);

    responseHandler(res, 200, "OK", true, bookings);
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
};

const bookingController = {
  addBooking,
  updateBookingStatus,
  getBookingHistory
};

export default bookingController;