import { Request, Response } from 'express';
import { userService } from '../services';
import responseHandler from '../utils/response-handler';

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const requestBody = req.body;

    if (!requestBody.username || !requestBody.email || !requestBody.password) {
      throw new Error('Name, email, and password are required');
    }

    const userRegisterRequest = {
      username: requestBody.username,
      email: requestBody.email,
      password: requestBody.password,
      isAdmin: requestBody.is_admin,
    }

    const userId = await userService.register(userRegisterRequest);

    responseHandler(res, 201, 'User registered successfully', true, { userId });
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
}

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const requestBody = req.body;

    if (!requestBody.email || !requestBody.password) {
      throw new Error('Email and password are required');
    }

    const token = await userService.login(requestBody.email, requestBody.password);

    responseHandler(res, 200, 'User logged in successfully', true, { token });
  } catch (er) {
    if (er instanceof Error) {
      responseHandler(res, 400, er.message, false);
    }
  }
}

const userController = {
  register,
  login
}

export default userController;