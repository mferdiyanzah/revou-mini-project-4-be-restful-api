import { type Request, type Response } from 'express';

import { bookingController } from '../../src/controllers';
import { bookingService } from '../../src/services';

jest.mock('../../src/services');

describe('Booking Controller', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as unknown as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addBooking', () => {
    it('should add a booking and return the id', async () => {
      const requestBody = { showtime_seat_id: 1, };
      const authHeader = 'Bearer token';

      req.body = requestBody;
      req.headers = { authorization: authHeader };

      const expectedId = 1;
      (bookingService.addBooking as jest.Mock).mockResolvedValue(expectedId);

      await bookingController.addBooking(req, res);

      expect(bookingService.addBooking).toHaveBeenCalledWith({
        user_id: undefined,
        showtime_seat_id: requestBody.showtime_seat_id,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: { bookingId: expectedId }, }));
    });

    it('should return 400 if request is invalid', async () => {
      req.body = {};

      await bookingController.addBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Showtime Seat ID is required' }));
    });
  });

  describe('updateBookingStatus', () => {
    beforeEach(() => {
      req.headers = { authorization: 'Bearer token' };
    });

    it('should update a booking status', async () => {
      const id = '1';

      req.params = { id };


      const result = 1;
      (bookingService.updateBookingStatus as jest.Mock).mockResolvedValue(result);

      await bookingController.updateBookingStatus(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'OK' }));
    });

    it('should return 200 if booking not found', async () => {
      const id = '1';

      req.params = { id };

      const result = 0;
      (bookingService.updateBookingStatus as jest.Mock).mockResolvedValue(result);

      await bookingController.updateBookingStatus(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Booking not found' }));
    });

    it('should return 400 if service throws an error', async () => {
      const id = '1';

      req.params = { id };

      (bookingService.updateBookingStatus as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));

      await bookingController.updateBookingStatus(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Internal Server Error' }));
    });
  });

  describe('getBookingHistory', () => {
    beforeEach(() => {
      const authHeader = 'Bearer token';
      req.headers = { authorization: authHeader };
    });

    it('should return booking history', async () => {
      const bookings = [{
        id: 1, showtime_seat_id: 1, user_id: 1, status: 'confirmed'
      }];

      (bookingService.getBookingHistory as jest.Mock).mockResolvedValue(bookings);
      await bookingController.getBookingHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: bookings }));
    });

    it('should return 400 if service throws an error', async () => {
      (bookingService.getBookingHistory as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));
      await bookingController.getBookingHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Internal Server Error' }));
    });
  });
});