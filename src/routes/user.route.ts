import { Router } from 'express';
import { UserController } from '../controllers';

const userRoute = Router();
const userController = UserController();

userRoute.post('/register', userController.register);
// userRoute.post('/login', userController.login);

export default userRoute;