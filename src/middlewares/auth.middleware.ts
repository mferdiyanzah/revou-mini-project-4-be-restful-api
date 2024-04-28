import {
  type NextFunction,
  type Request, type Response
} from "express";

import { decodeToken } from "../utils/jwt";
import responseHandler from "../utils/response-handler";

const verifyRequestToken = (req: Request): boolean => {
  const token = req.headers.authorization;
  if (token == null) {
    throw new Error("Token is required");
  }

  return true;
};

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    verifyRequestToken(req);
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
  try {
    if (!verifyRequestToken(req)) return;

    const authHeader = req.headers.authorization ?? '';
    const decoded = decodeToken(authHeader);

    console.log(decoded);
    if (decoded?.isAdmin !== 1) {
      throw new Error("Unauthorized");
    }

    next();
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 401, er.message, false);
    }
  }
};

export { authMiddleware, adminMiddleware };

