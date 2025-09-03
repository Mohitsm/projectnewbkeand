import express from "express";
import {
  createSummary,
  getSummaries,
  getSummaryById,
  updateSummary,
  deleteSummary,
} from "../controllers/selectionSummary.controller.js";

const router = express.Router();

router.post("/", createSummary);       // Create
router.get("/", getSummaries);         // Get all
router.get("/:id", getSummaryById);    // Get by ID
router.put("/:id", updateSummary);     // Update
router.delete("/:id", deleteSummary);  // Delete

export default router;
