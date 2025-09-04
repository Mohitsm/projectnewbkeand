import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: null }, // optional phone field
  password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
