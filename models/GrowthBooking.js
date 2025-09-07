// // models/GrowthBooking.js
// import mongoose from "mongoose";

// const growthBookingSchema = new mongoose.Schema(
//   {
//     serviceId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "GrowthService",
//       required: true,
//     },
//     selectedSlot: {
//       type: String,
//       required: false, // optional
//     },
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       lowercase: true,
//     },
//     phone: {
//       type: String,
//       required: true,
//     },
//     message: {
//       type: String,
//     },
//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "cancelled"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("GrowthBooking", growthBookingSchema);
// models/GrowthBooking.js - Quick fix to make it work
import mongoose from "mongoose";

const growthBookingSchema = new mongoose.Schema(
  {
userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GrowthService",
      required: false, // Made optional to prevent validation errors
    },
    
    // Add these fields to support your frontend
    serviceName: {
      type: String,
      required: false,
    },
    
    serviceCategory: {
      type: String,
      required: false,
    },
    
    selectedSlot: {
      type: String,
      required: false,
    },
    
    name: {
      type: String,
      required: true,
      trim: true,
    },
    
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    
    phone: {
      type: String,
      required: true,
    },
    
    company: {
      type: String,
      required: false,
    },
    
    message: {
      type: String,
      required: false,
    },
    
    charges: {
      type: String,
      required: false,
    },
    
    internalTimeline: {
      type: String,
      required: false,
    },
    
    externalTimeline: {
      type: String,
      required: false,
    },
    selectedSlot: {
    type: String,
    required: false, // optional field
  },
    
    documents: [{
      originalName: String,
      filename: String,
      path: String,
      mimetype: String,
      size: Number
    }],
    
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("GrowthBooking", growthBookingSchema);