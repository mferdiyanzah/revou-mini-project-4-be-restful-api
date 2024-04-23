import { type Request, type Response } from 'express';

import { type JwtPayload } from 'jsonwebtoken';

import { bookingService } from '../services';
import { decodeToken } from '../utils/jwt';
import responseHandler from '../utils/response-handler';

const addBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const requestBody = req.body;

    if (requestBody.showtime_seat_id === undefined) {
      throw new Error("User ID and Showtime Seat ID are required");
    }

    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    const decoded: JwtPayload | string = decodeToken(String(token));

    const bookingPayload = {
      user_id: (decoded)?.userId,
      showtime_seat_id: requestBody.showtime_seat_id,
    };

    const bookingId = await bookingService.addBooking(bookingPayload);

    responseHandler(res, 201, "Created", true, { bookingId });
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
};

const updateBookingStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookingId = req.params.id;

    const status = "confirmed";

    const result = await bookingService.updateBookingStatus(bookingId, status);

    if (result === 0) {
      responseHandler(res, 200, "Booking not found", false);
    }

    responseHandler(res, 200, "OK", true);
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
};

const getBookingHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    const decoded: JwtPayload | string = decodeToken(String(token));

    const bookings = await bookingService.getBookingHistory(decoded?.userId as string);

    responseHandler(res, 200, "OK", true, bookings);
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
};

const bookingController = {
  addBooking, updateBookingStatus, getBookingHistory
};

export default bookingController;