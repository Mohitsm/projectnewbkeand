import express from "express";
import {
  createBusinessSetup,
  getBusinessSetups,
  getBusinessSetupById,
  updateBusinessSetup,
  deleteBusinessSetup,
} from "../controllers/businessSetupController.js";

const router = express.Router();

router.post("/", createBusinessSetup);       // Create
router.get("/", getBusinessSetups);          // Get all
router.get("/:id", getBusinessSetupById);    // Get by ID
router.put("/:id", updateBusinessSetup);     // Update
router.delete("/:id", deleteBusinessSetup); // Delete

export default router;
