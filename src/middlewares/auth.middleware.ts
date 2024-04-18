import { type Request, type Response, type NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import responseHandler from "../utils/response-handler";
import { type JwtPayload } from "jsonwebtoken";

const verifyRequestToken = (req: Request): JwtPayload => {
  const token = req.headers.authorization;
  if (token == null) {
    throw new Error("Token is required");
  }

  const decoded = verifyToken(token);
  if (typeof decoded !== "object") {
    throw new Error("Invalid token");
  }

  return decoded;
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
    const decoded = verifyRequestToken(req);

    if (decoded.role !== "admin") {
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
