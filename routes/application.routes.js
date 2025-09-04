import express from "express";
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} from "../controllers/application.controller.js";
import { validateApplication } from "../middleware/validateApplication.js";

const router = express.Router();

router.post("/", validateApplication, createApplication);
router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;
