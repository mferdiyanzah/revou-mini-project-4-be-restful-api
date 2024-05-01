import { type Request, type Response } from 'express';

import { type UpdateMovieShowRequest, type MovieShowRequest } from '../models/movie-show.model';
import { movieShowTimeService } from '../services';
import { validateRequest } from '../utils/global';
import responseHandler from '../utils/response-handler';

const addShowTime = async (req: Request, res: Response): Promise<void> => {
  try {
    const request = req.body as MovieShowRequest;
    const requiredKeys = ['movie_id', 'price', 'show_time'];
    const isRequestInvalid = !validateRequest(requiredKeys, request);

    if (isRequestInvalid) {
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
    if (id === undefined) {
      throw new Error("Showtime ID is required");
    }

    const updateShowTimerequest = req.body as UpdateMovieShowRequest;
    if (updateShowTimerequest === undefined) {
      throw new Error("Request body is required");
    }

    const { show_time, status } = updateShowTimerequest;

    if (status === "now_showing") {
      if (show_time === undefined) {
        throw new Error("Show time is required for now showing status");
      }
    }

    updateShowTimerequest.id = parseInt(id);

    await movieShowTimeService.updateShowTime(updateShowTimerequest);
    responseHandler(res, 200, "OK", true);
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
    responseHandler(res, 200, "OK", true);
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
};

const movieShowTimeController = {
  addShowTime,
  updateShowTime,
  deleteShowTime
};

export default movieShowTimeController;