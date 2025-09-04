import express from "express";

import { 
  createSummary,
  getSummaries,
  getSummaryById,
  updateSummary,
  deleteSummary,
  calculateSummary
} from "../controllers/selectionSummary.controller.js";

const router = express.Router();

// Cost calculation
router.post("/calculate", calculateSummary);

// CRUD
router.post("/", createSummary);
router.get("/", getSummaries);
router.get("/:id", getSummaryById);
router.put("/:id", updateSummary);
router.delete("/:id", deleteSummary);

export default router;
