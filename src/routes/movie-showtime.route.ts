import { Router } from "express";

import movieShowTimeController from "../controllers/movie-showtime.controller";
import { adminMiddleware } from "../middlewares/auth.middleware";

const movieShowtimeRoute = Router();

movieShowtimeRoute.use(adminMiddleware);
movieShowtimeRoute.post("/add", movieShowTimeController.addShowTime);
movieShowtimeRoute.put("/:id", movieShowTimeController.updateShowTime);
movieShowtimeRoute.delete("/:id", movieShowTimeController.deleteShowTime);

export default movieShowtimeRoute;