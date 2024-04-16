import { Request, Response } from 'express';
import { UserService } from '../services';
import { UserRegisterRequest } from '../models/user.model';
import { error, success } from '../utils/response-handler';

const UserController = () => {
  const userService = UserService();

  const register = async (req: Request, res: Response): Promise<void> => {
    try {
      const requestBody = req.body;

      const userRegisterRequest: UserRegisterRequest = {
        username: requestBody.username,
        email: requestBody.email,
        password: requestBody.password,
        isAdmin: requestBody.is_admin,
      }

      if (!requestBody.username || !requestBody.email || !requestBody.password) {
        throw new Error('Name, email, and password are required');
      }

      const userId = await userService.register(userRegisterRequest);
      res.status(201).json(success('User registered successfully', { userId }, 201));
    } catch (er) {
      if (er instanceof Error) {
        if (er.message.includes('ER_DUP_ENTRY')) {
          res.status(409).json(error('Username or email already exists', 409));
          return;
        }

        res.status(400).json(error(er.message, 400));
      }
    }
  }

  // const login = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const requestBody = req.body;

  //     if (!requestBody.email || !requestBody.password) {
  //       throw new Error('Email and password are required');
  //     }

  //     const token = await userService.login(requestBody.email, requestBody.password);
  //     res.status(201).json(success('User logged in successfully', { token }, 201));
  //   } catch (er) {
  //     if (er instanceof Error) {
  //       res.status(400).json(error(er.message, 400));
  //     }
  //   }
  // }

  return {
    register,
    // login
  }
}

export default UserController;