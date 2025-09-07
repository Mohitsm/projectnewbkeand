import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fees: { type: String },
  b2bCosting: { type: String },
  internalTimeline: { type: String },
  externalTimeline: { type: String },
  documentsRequired: { type: String }
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  services: [serviceSchema]
});

export default mongoose.model("Category", categorySchema);
