import mongoose from "mongoose";

const selectionSummarySchema = new mongoose.Schema({
  selectedActivities: { type: [String], required: true },
  shareholders: { type: Number, required: true },
  totalVisas: { type: Number, required: true },
  tenure: { type: Number, required: true },   // number instead of string
  entityType: { type: String, required: true },
  estimatedCost: { type: Number },            // optional
  recommendedPackage: { type: Object },       // optional
}, { timestamps: true });

export default mongoose.model("SelectionSummary", selectionSummarySchema);
