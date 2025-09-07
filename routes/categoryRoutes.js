import express from "express";
import multer from "multer";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  uploadExcel
} from "../controllers/categoryController.js";
import { validateCategory } from "../middleware/validateCategory.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// CRUD routes with middleware
router.post("/", validateCategory, createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.put("/:id", validateCategory, updateCategory);
router.delete("/:id", deleteCategory);

// Excel upload
router.post("/upload", upload.single("file"), uploadExcel);

export default router;
