import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/openapi.json";
import routerV1 from "./routes";
import logger from "./middlewares/logger";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

app.use(logger);
app.use("/api/v1", routerV1);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
