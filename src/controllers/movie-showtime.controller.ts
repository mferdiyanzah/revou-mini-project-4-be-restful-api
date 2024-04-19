import { type Request, type Response } from 'express';

import { movieShowTimeService } from '../services';
import responseHandler from '../utils/response-handler';

const addShowTime = async (req: Request, res: Response): Promise<void> => {
  try {
    const { movieId, price, showTime } = req.body;

    const showTimeId = await movieShowTimeService.addShowTime(movieId as string, price as number, showTime as string);

    responseHandler(res, 201, "Created", true, { id: showTimeId });
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
};

const movieShowTimeController = { addShowTime, };

export default movieShowTimeController;