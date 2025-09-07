// models/GrowthService.js
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fees: { type: String },
  internalTimeline: { type: String },
  externalTimeline: { type: String },
  requiredDocs: { type: String },
  discountedPrice: { type: String },
});

const growthServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    services: [serviceSchema],
  },
  { timestamps: true }
);

export default mongoose.model("GrowthService", growthServiceSchema);
