import mongoose from "mongoose";

const selectionSummarySchema = new mongoose.Schema({
  businessActivities: {
    type: [String], // multiple activities possible
    required: true,
  },
  shareholders: {
    type: Number,
    required: true,
  },
  totalVisas: {
    type: Number,
    required: true,
  },
  tenure: {
    type: String,
    required: true,
  },
  entityType: {
    type: String,
    required: true,
  },
  zoneType: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("SelectionSummary", selectionSummarySchema);
