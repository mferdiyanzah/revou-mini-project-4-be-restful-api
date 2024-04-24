import {
  type NextFunction,
  type Request, type Response
} from "express";


import { type JwtPayload } from "jsonwebtoken";

import { userService } from "../services";
import { verifyToken } from "../utils/jwt";
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
    const authHeader = req.headers.authorization;
    if (authHeader == null) {
      throw new Error("Token is required");
    }

    const token = authHeader.split(" ")[1];
    const decoded: JwtPayload | string = verifyToken(String(token));

    const user = await userService.findUserByEmail((decoded as JwtPayload)?.email as string);
    if (user == null) {
      throw new Error("User not found");
    }
    console.log(user);
    if (!user.isAdmin) {
      throw new Error("Unauthorized");
    }

    next();
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 401, er.message, false);
    }
  }
};

export { adminMiddleware, authMiddleware };

