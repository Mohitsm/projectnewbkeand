import express from "express";
import multer from "multer";
import {
  createGrowthService,
  getGrowthServices,
  getGrowthServiceById,
  updateGrowthService,
  deleteGrowthService,
  uploadExcel,
} from "../controllers/growthServiceController.js";

const router = express.Router();

// Multer setup for Excel upload
const upload = multer({ dest: "uploads/" });

router.post("/", createGrowthService);
router.get("/", getGrowthServices);
router.get("/:id", getGrowthServiceById);
router.put("/:id", updateGrowthService);
router.delete("/:id", deleteGrowthService);


// Excel upload
router.post("/upload-excel", upload.single("file"), uploadExcel);

export default router;
