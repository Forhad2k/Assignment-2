import express from "express";
import auth from "../../middleware/auth";
import { bookingController } from "./booking.controller";




const router = express.Router();

router.post("/", bookingController.createBooking);

router.get("/",  bookingController.getBookings);
 
router.put("/:bookingId", bookingController.updateBooking);


export const bookingRouter = router;