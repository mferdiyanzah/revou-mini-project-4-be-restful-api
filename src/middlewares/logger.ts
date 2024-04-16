import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  const defaultWrite = res.write;
  const defaultEnd = res.end;
  const chunks: any[] = [];

  // @ts-ignore
  res.write = (...restArgs: any[]) => {
    chunks.push(Buffer.from(restArgs[0]));
    // @ts-ignore
    defaultWrite.apply(res, restArgs);
  }

  // @ts-ignore
  res.end = (...restArgs: any[]) => {
    if (restArgs[0]) {
      chunks.push(Buffer.from(restArgs[0]));
    }

    const time = new Date().toISOString();
    console.log(`[${time}] - ${req.method} ${req.url} ${res.statusCode} ${Buffer.concat(chunks).toString()}`);
    // @ts-ignore
    defaultEnd.apply(res, restArgs);
  }
  next();
}

export default logger;