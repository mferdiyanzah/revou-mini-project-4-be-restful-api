import {
  type NextFunction,
  type Request, type Response
} from "express";

import {
  decode, type JwtPayload, verify
} from "jsonwebtoken";

import responseHandler from "../utils/response-handler";

const extractAndDecodeToken = (req: Request): JwtPayload | null => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token === undefined || token === null || token === "") {
    return null;
  }

  try {
    const secret = String(process.env.JWT_SECRET_KEY);
    verify(token, secret);
    return decode(token) as JwtPayload;
  } catch (err) {
    return null;
  }
};

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const decoded = extractAndDecodeToken(req);
    if (decoded === null) {
      responseHandler(res, 401, "Unauthenticated", false);
      return;
    }
    next();
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 401, er.message, false);
    }
  }
};

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const decoded = extractAndDecodeToken(req);
  if (decoded === null) {
    responseHandler(res, 401, "Unauthenticated", false);
    return;
  }
  if (decoded.isAdmin !== 1) {
    responseHandler(res, 403, "Unauthorized", false);
    return;
  }
  next();
};

export { adminMiddleware, authMiddleware };