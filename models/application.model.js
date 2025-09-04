import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true, // e.g. "company-formation-licensing"
    },
    formData: {
      type: Object, // flexible JSON form data
      required: true,
    },
    costEstimate: {
      type: Object, // if you calculate and attach cost breakdown
      default: null,
    },
    status: {
      type: String,
      enum: ["draft", "submitted", "reviewed", "completed"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
