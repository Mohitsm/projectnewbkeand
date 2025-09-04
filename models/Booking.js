import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    serviceId: { type: String, required: true },
    serviceName: { type: String, required: false }, // optional
    packageType: { type: String, default: null },
    selectedSlot: { type: String, required: true }, // mapped from UI `slot`
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    company: { type: String, default: "" },
    message: { type: String, default: "" },
    preferredContact: {
      type: String,
      enum: ["email", "phone", "whatsapp"],
      default: "email",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
