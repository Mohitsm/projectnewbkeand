import mongoose from "mongoose";

const bookingsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    serviceName: { type: String, required: true },
    category: { type: String, required: true },
    fees: { type: String },
    b2b: { type: String },
    internalTimeline: { type: String },
    externalTimeline: { type: String },

    selectedSlot: { type: String },

    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    notes: { type: String },

    documents: [
      {
        docName: { type: String },
        fileUrl: { type: String },
      },
    ],

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },

    referenceId: {
      type: String,
      default: () =>
        "REF-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bookings", bookingsSchema);
