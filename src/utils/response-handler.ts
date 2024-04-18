import type { Response } from "express";

const responseHandler = (
  res: Response,
  code: number,
  message: string,
  success: boolean,
  data?: any | null,
): void => {
  res.status(code).json({ success, code, message, data });
};

export default responseHandler;
