import { Router } from "express";

import movieShowTimeController from "../controllers/movie-showtime.controller";

const movieShowtimeRoute = Router();

// movieShowtimeRoute.use(adminMiddleware);
movieShowtimeRoute.post("/add", movieShowTimeController.addShowTime);

export default movieShowtimeRoute;