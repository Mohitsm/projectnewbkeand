import express from "express";
import { calculateSelection, saveSelection, getSelections } from "../controllers/selectionSummaryController.js";

const router = express.Router();

router.post("/calculate", calculateSelection);
router.post("/", saveSelection);
router.get("/", getSelections);

export default router;
