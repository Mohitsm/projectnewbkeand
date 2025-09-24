import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    selectedPackage: {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
    paymentMethod: { type: String, required: true }, // e.g., credit-card
    paymentStatus: { type: String, required: true }, // e.g., completed, failed
    paymentTimestamp: { type: Date, default: Date.now },
    stripePaymentId: { type: String, required: true }, // Transaction ID from Stripe
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
