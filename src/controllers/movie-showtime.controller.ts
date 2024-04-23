import { type Request, type Response } from 'express';

import { type UpdateMovieShowRequest, type MovieShowRequest } from '../models/movie-show.model';
import { movieShowTimeService } from '../services';
import responseHandler from '../utils/response-handler';

const addShowTime = async (req: Request, res: Response): Promise<void> => {
  try {
    const request = req.body as MovieShowRequest;
    const isRequestValid = request.movie_id !== null && request.price !== null && request.show_time !== null;
    if (!isRequestValid) {
      responseHandler(res, 400, "Invalid request", false);
      return;
    }

    const showTimeId = await movieShowTimeService.addShowTime(request);

    responseHandler(res, 201, "Created", true, { id: showTimeId });
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
};

const updateShowTime = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const request = req.body as UpdateMovieShowRequest;
    request.id = parseInt(id);

    await movieShowTimeService.updateShowTime(request);
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
};

const deleteShowTime = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await movieShowTimeService.deleteShowTime(id);
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
};

const movieShowTimeController = {
  addShowTime, updateShowTime, deleteShowTime
};

export default movieShowTimeController;