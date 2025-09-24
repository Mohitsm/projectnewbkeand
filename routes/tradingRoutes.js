import express from "express";
import {
  createTrading,
  getTradings,
  getTradingById,
  updateTrading,
  deleteTrading,
} from "../controllers/tradingController.js";

const router = express.Router();

router.post("/", createTrading);
router.get("/", getTradings);
router.get("/:id", getTradingById);
router.put("/:id", updateTrading);
router.delete("/:id", deleteTrading);

export default router;
