import { Router } from "express";

import bookingRoute from "./booking.route";
import movieShowtimeRoute from "./movie-showtime.route";
import movieRoute from "./movie.route";
import userRoute from "./user.route";

const routerV1 = Router();

routerV1.use("/user", userRoute);
routerV1.use("/movie", movieRoute);
routerV1.use("/movie-showtime", movieShowtimeRoute);
routerV1.use("/booking", bookingRoute);

export default routerV1;
