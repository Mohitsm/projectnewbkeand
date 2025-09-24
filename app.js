import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import bodyParser from "body-parser";

// Local imports
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";
import { logger } from "./middleware/logger.js";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import selectionSummaryRoutes from "./routes/selectionSummary.routes.js";
import applicationRoutes from "./routes/application.routes.js";
// import servicesRouter from "./routes/services.js";
import bookingsRouter from "./routes/bookings.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import growthServiceRoutes from "./routes/growthServiceRoutes.js";
import growthBookingRoutes from "./routes/growthBookingRoutes.js";
import businessSetupRoutes from "./routes/businessSetupRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import tradingRoutes from "./routes/tradingRoutes.js";

// Load environment variables
dotenv.config();

// Express app init
const app = express();

// MongoDB connection
connectDB();

// Middleware
app.use(express.json());
app.use(logger);

// Enable CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:8080",
      "https://capable-ganache-c885a7.netlify.app",
      "https://dapper-cascaron-2796d3.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// Static serving for uploaded files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/selection-summaries", selectionSummaryRoutes);
app.use("/api/applications", applicationRoutes);
// app.use("/api/services", servicesRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/categories", categoryRoutes);
app.use("/api/growthbookings", growthBookingRoutes);
app.use("/api/growthservices", growthServiceRoutes);
app.use("/api/business-setups", businessSetupRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/tradings", tradingRoutes);

// ✅ Stripe Integration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects smallest currency unit (fils/cents)
      currency: currency || "aed",
      payment_method_types: ["card"],
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id, // pass transaction ID
    });
  } catch (err) {
    console.error("Payment Intent Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
