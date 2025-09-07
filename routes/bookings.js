import express from "express";
import upload from "../middleware/upload.js";
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  getBookingsByUserId,
} from "../controllers/bookingsController.js";

const router = express.Router();

router.post("/", upload.array("documents"), createBooking);
router.get("/", getBookings);
router.get("/:id", getBookingById);
router.patch("/:id/status", updateBookingStatus); // update status
router.delete("/:id", deleteBooking);
router.get("/user/:userId", getBookingsByUserId);

export default router;
