import { type Request, type Response, type NextFunction } from "express";

const generateStatusCode = (statusCode: number): string => {
  if (statusCode >= 200 && statusCode < 300) {
    const status = "\x1b[32m" + statusCode + "\x1b[0m";
    return status;
  }

  if (statusCode >= 300 && statusCode < 400) {
    const status = "\x1b[33m" + statusCode + "\x1b[0m";
    return status;
  }

  if (statusCode >= 400) {
    const status = "\x1b[31m" + statusCode + "\x1b[0m";
    return status;
  }

  return statusCode.toString();
};

const logger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = process.hrtime();

  res.on("finish", () => {
    const elapsedTime = process.hrtime(startTime);
    const time = elapsedTime[0] * 1000 + elapsedTime[1] / 1e6;
    const statusCode = generateStatusCode(res.statusCode);
    const timeColor = time < 100 ? "\x1b[32m" : "\x1b[31m";
    const currentTime = new Date().toISOString();

    console.log(
      `${currentTime} - ${req.method} ${req.originalUrl} - ${statusCode} - ${timeColor}${time.toFixed(2)}ms\x1b[0m`,
    );
  });

  next();
};

export default logger;
