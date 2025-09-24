import express from "express";
import { createPayment, getPayments, getPaymentById, deletePayment } from "../controllers/paymentController.js";

const router = express.Router();

// Create new payment
router.post("/", createPayment);

// Get all payments
router.get("/", getPayments);

// Get single payment
router.get("/:id", getPaymentById);

// Delete payment
router.delete("/:id", deletePayment);

export default router;
