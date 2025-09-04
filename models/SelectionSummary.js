import mongoose from "mongoose";

const selectionSummarySchema = new mongoose.Schema({
  selectedActivities: [String],
  shareholders: Number,
  totalVisas: Number,
  tenure: Number,
  entityType: String,
  estimatedCost: Number,
  recommendedPackage: Object,
  alternativePackages: [Object],
  costBreakdown: Object,
  isFreezone: Boolean,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("SelectionSummary", selectionSummarySchema);
