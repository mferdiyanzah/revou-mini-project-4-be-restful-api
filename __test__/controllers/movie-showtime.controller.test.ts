import { type Request, type Response } from 'express';

import { movieShowTimeController } from '../../src/controllers';
import { movieShowTimeService } from '../../src/services';

jest.mock('../../src/services');

describe('Movie Showtime Controller', () => {
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

  describe('addShowTime', () => {
    it('should add a showtime and return the id', async () => {
      const requestBody = {
        movie_id: 1,
        price: 50000,
        show_time: '2022-01-01 12:00:00',
      };

      req.body = requestBody;

      const expectedId = 1;
      (movieShowTimeService.addShowTime as jest.Mock).mockResolvedValue(expectedId);

      await movieShowTimeController.addShowTime(req, res);

      expect(movieShowTimeService.addShowTime).toHaveBeenCalledWith({
        movie_id: requestBody.movie_id,
        price: requestBody.price,
        show_time: requestBody.show_time,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: { id: expectedId }, }));
    });

    it('should return 400 if request is invalid', async () => {
      req.body = {};

      await movieShowTimeController.addShowTime(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Invalid request' }));
    });

    it('should return 400 if service throws an error', async () => {
      const requestBody = {
        movie_id: 1,
        price: 50000,
        show_time: '2022-01-01 12:00:00',
      };

      req.body = requestBody;

      (movieShowTimeService.addShowTime as jest.Mock).mockRejectedValue(new Error('Internal server error'));
      await movieShowTimeController.addShowTime(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Internal server error' }));
    });
  });

  describe('updateShowTime', () => {
    it('should update a showtime', async () => {
      const id = '1';
      req.params = { id };

      const requestBody = {
        price: 50000,
        show_time: '2022-01-01 12:00:00',
      };

      req.body = requestBody;

      await movieShowTimeController.updateShowTime(req, res);

      expect(movieShowTimeService.updateShowTime).toHaveBeenCalledWith({
        id: parseInt(id),
        price: requestBody.price,
        show_time: requestBody.show_time,
      });
    });

    it('should return 400 if request is invalid', async () => {
      req.body = {};
      req.params = { id: '1' };

      (movieShowTimeService.updateShowTime as jest.Mock).mockRejectedValue(new Error('Invalid request'));
      await movieShowTimeController.updateShowTime(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Invalid request' }));
    });
  });

  describe('deleteShowTime', () => {
    it('should delete a showtime', async () => {
      const id = '1';
      req.params = { id };

      await movieShowTimeController.deleteShowTime(req, res);

      expect(movieShowTimeService.deleteShowTime).toHaveBeenCalledWith(id);
    });

    it('should return 400 if request is invalid', async () => {
      req.params = {};

      (movieShowTimeService.deleteShowTime as jest.Mock).mockRejectedValue(new Error('Invalid request'));
      await movieShowTimeController.deleteShowTime(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Invalid request' }));
    });
  });
});