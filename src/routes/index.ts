import { Router } from "express";

import movieShowtimeRoute from "./movie-showtime.route";
import movieRoute from "./movie.route";
import userRoute from "./user.route";

const routerV1 = Router();

routerV1.use("/user", userRoute);
routerV1.use("/movie", movieRoute);
routerV1.use("/movie-showtime", movieShowtimeRoute);

export default routerV1;
