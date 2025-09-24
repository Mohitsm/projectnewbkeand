import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  tenure: { type: Number, required: true },
  visas: { type: Number, required: true },
  shareholders: { type: String, required: true },
  activities: { type: String, required: true },
});

const TradingSchema = new mongoose.Schema({
  jurisdiction: { type: String, required: true },
  emirate: { type: String, required: true },
  selectedPackage: { type: PackageSchema, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Trading = mongoose.model("Trading", TradingSchema);
export default Trading;
