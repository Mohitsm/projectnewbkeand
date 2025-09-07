// // routes/growthBookingRoutes.js
// import express from "express";
// import {
//   createGrowthBooking,
//   getGrowthBookings,
//   getGrowthBookingById,
//   updateGrowthBooking,
//   deleteGrowthBooking,
//   updateBookingStatus,
// } from "../controllers/growthBookingController.js";
// // import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Public
// router.post("/", createGrowthBooking);

// // Protected (admin only)
// router.get("/", getGrowthBookings);
// router.get("/:id", getGrowthBookingById);
// router.put("/:id", updateGrowthBooking);
// router.delete("/:id", deleteGrowthBooking);
// router.put("/:id/status", updateBookingStatus);

// export default router;
// routes/growthBookingRoutes.js
import express from "express";
import {
  createGrowthBooking,
  getGrowthBookings,
  getGrowthBookingById,
  updateGrowthBooking,
  deleteGrowthBooking,
  updateBookingStatus,
  getBookingsByUser,
} from "../controllers/growthBookingController.js";
import upload from "../middleware/upload.js"; // Update this path to match your multer file location

const router = express.Router();

// Public routes
// Use upload.array('documents') to handle multiple file uploads with the field name 'documents'
router.post("/", upload.array('documents', 10), createGrowthBooking);

// Protected routes (admin only)
router.get("/", getGrowthBookings);
router.get("/:id", getGrowthBookingById);
router.put("/:id", updateGrowthBooking);
router.delete("/:id", deleteGrowthBooking);
router.put("/:id/status", updateBookingStatus);
router.get("/user/:userId", getBookingsByUser);

export default router;