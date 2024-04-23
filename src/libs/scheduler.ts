import * as schedule from 'node-schedule';

// Schedule a job to run every 30 seconds
const scheduleJob = (): void => {
  schedule.scheduleJob('*/10 * * * * *', () => {
    console.log('Job executed');
  });
};

export default scheduleJob;