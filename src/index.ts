import express from "express";

import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "./docs/openapi.json";
import scheduleJob from "./libs/scheduler";
import logger from "./middlewares/logger";
import routerV1 from "./routes";


dotenv.config();
const app = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

app.use(logger);
app.use("/api/v1", routerV1);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  scheduleJob();
});

export default app;
