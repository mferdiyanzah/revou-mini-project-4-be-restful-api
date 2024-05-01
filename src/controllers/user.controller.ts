import { type Request, type Response } from "express";

import { type UserLoginRequest } from "../models/user.model";
import { userService } from "../services";
import { validateRequest } from "../utils/global";
import responseHandler from "../utils/response-handler";

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRegisterRequest = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.is_admin,
    };
    const requiredKeys = ["username", "email", "password"];
    const isRequestInvalid = !validateRequest(requiredKeys, userRegisterRequest);

    if (isRequestInvalid) {
      throw new Error("Username, email, and password are required");
    }

    const token = await userService.register(userRegisterRequest);
    responseHandler(res, 201, "User created successfully", true, { token });
  } catch (er) {
    if (er instanceof Error) {
      const statusCode = er.message === "User already exists" ? 409 : 400;
      responseHandler(res, statusCode, er.message, false);
    }
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const userLoginRequest: UserLoginRequest = req.body;
    const requiredKeys = ["email", "password"];
    const isRequestInvalid = !validateRequest(requiredKeys, userLoginRequest);

    if (isRequestInvalid) {
      throw new Error("Email and password are required");
    }

    const token = await userService.login(userLoginRequest);
    responseHandler(res, 200, "User logged in successfully", true, { token });
  } catch (er) {
    if (er instanceof Error) {
      const statusCode = er.message === "Invalid credentials" ? 401 : 400;
      responseHandler(res, statusCode, er.message, false);
    }
  }
};

const userController = {
  register,
  login,
};

export default userController;