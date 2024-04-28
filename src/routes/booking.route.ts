import { Router } from "express";

import { bookingController } from "../controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const bookingRoute = Router();

bookingRoute.use(authMiddleware);

bookingRoute.post("/add", bookingController.addBooking);
bookingRoute.put("/paid/:bookingId", bookingController.updateBookingStatus);
bookingRoute.get("/history", bookingController.getBookingHistory);

export default bookingRoute;