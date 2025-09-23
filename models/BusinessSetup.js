import mongoose from "mongoose";

const SelectedPackageSchema = new mongoose.Schema({
  zone: { type: String, required: true },
  name: { type: String, required: true },
  activities: { type: String, required: true },
  shareholders: { type: String, required: true },
  visas: { type: Number, required: true },
  tenure: { type: Number, required: true },
  price: { type: Number, required: true },
});

const BusinessSetupSchema = new mongoose.Schema(
  {
    selectedActivities: [{ type: String, required: true }],
    shareholders: { type: Number, required: true },
    totalVisas: { type: Number, required: true },
    tenure: { type: Number, required: true },
    estimatedCost: { type: Number, required: true },
    selectedPackage: { type: SelectedPackageSchema, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("BusinessSetup", BusinessSetupSchema);
