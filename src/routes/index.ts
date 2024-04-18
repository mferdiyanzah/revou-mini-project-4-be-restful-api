import { Router } from "express";

import movieRoute from "./movie.route";
import userRoute from "./user.route";

const routerV1 = Router();

routerV1.use("/user", userRoute);
routerV1.use("/movie", movieRoute);

export default routerV1;
