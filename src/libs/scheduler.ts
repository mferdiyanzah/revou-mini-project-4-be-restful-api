import * as schedule from 'node-schedule';

import { bookingService, movieShowTimeService } from '../services';

const updateServices = async (): Promise<void> => {
  await Promise.all([
    bookingService.updateExpiredBooking(),
    movieShowTimeService.updateShowTimeFinished(),
    movieShowTimeService.updateShowTimeNowPlaying()
  ]);
};

const scheduleJob = (): void => {
  schedule.scheduleJob('*/30 * * * * *', updateServices);
};

export default scheduleJob;