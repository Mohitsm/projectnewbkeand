import express from "express";
import { signup, signin, getUser, updateUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", protect, getUser);        // get logged-in user
router.put("/update", protect, updateUser); // update logged-in user

export default router;
