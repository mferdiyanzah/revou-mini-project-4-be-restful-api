import { Router } from "express";

import { movieController } from "../controllers";
import { adminMiddleware } from "../middlewares/auth.middleware";

const movieRoute = Router();

movieRoute.get("/all", movieController.getMovies);
movieRoute.get("/now-playing", movieController.getMoviesNowPlaying);
movieRoute.post("/add", adminMiddleware, movieController.addNewMovie);

movieRoute.get("/:id", movieController.getMovieById);
movieRoute.put("/:id", adminMiddleware, movieController.updateMovieById);
movieRoute.delete("/:id", adminMiddleware, movieController.deleteMovieById);

export default movieRoute;
