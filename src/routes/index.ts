import { Router } from 'express';
import userRoute from './user.route';
// import movieRoute from './movie.route';

const routerV1 = Router();

routerV1.use('/user', userRoute);
// routerV1.use('/movie', movieRoute);

export default routerV1;