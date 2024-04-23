import { type Request, type Response } from 'express';

import { userController } from '../../src/controllers';
import { userService } from '../../src/services';

jest.mock('../../src/services');

describe('User Controller', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as unknown as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a user and return a token', async () => {
      const requestBody = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
        is_admin: false,
      };

      req.body = requestBody;

      const expectedToken = 'testToken';
      (userService.register as jest.Mock).mockResolvedValue(expectedToken);

      await userController.register(req, res);

      expect(userService.register).toHaveBeenCalledWith({
        username: requestBody.username,
        email: requestBody.email,
        password: requestBody.password,
        isAdmin: requestBody.is_admin,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: { token: expectedToken }, }));
    });

    it('should return 400 if request is invalid', async () => {
      req.body = {};

      await userController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Name, email, and password are required' }));
    });
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const requestBody = {
        email: 'test@example.com',
        password: 'password',
      };

      req.body = requestBody;

      const expectedToken = 'testToken';
      (userService.login as jest.Mock).mockResolvedValue(expectedToken);

      await userController.login(req, res);

      expect(userService.login).toHaveBeenCalledWith(requestBody.email, requestBody.password);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: { token: expectedToken }, }));
    });

    it('should return 400 if request is invalid', async () => {
      req.body = {};

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Email and password are required' }));
    });
  });
});