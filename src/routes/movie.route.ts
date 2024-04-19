import { Router } from "express";

import { movieController } from "../controllers";

const movieRoute = Router();

movieRoute.get("/all", movieController.getMovies);
movieRoute.get("/now-playing", movieController.getMoviesNowPlaying);
movieRoute.post("/add", movieController.addNewMovie);

movieRoute.get("/:id", movieController.getMovieById);
movieRoute.put("/:id", movieController.updateMovieById);
movieRoute.delete("/:id", movieController.deleteMovieById);


export default movieRoute;
