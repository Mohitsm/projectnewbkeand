// // controllers/growthBookingController.js
// import GrowthBooking from "../models/GrowthBooking.js";

// // Create Booking
// export const createGrowthBooking = async (req, res) => {
//   try {
//     const { serviceId, selectedSlot, name, email, phone, message } = req.body;

//     if (!serviceId || !name || !email || !phone) {
//       return res.status(400).json({
//         success: false,
//         message: "serviceId, name, email, and phone are required",
//       });
//     }

//     const booking = new GrowthBooking({
//       serviceId,
//       selectedSlot,
//       name,
//       email,
//       phone,
//       message,
//     });

//     await booking.save();
//     res.status(201).json({ success: true, data: booking });
//   } catch (error) {
//     console.error("Create GrowthBooking error:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Get All Bookings
// export const getGrowthBookings = async (_req, res) => {
//   try {
//     const bookings = await GrowthBooking.find()
//       .populate("serviceId", "name services.title")
//       .sort({ createdAt: -1 });
//     res.json({ success: true, data: bookings });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Get Booking by ID
// export const getGrowthBookingById = async (req, res) => {
//   try {
//     const booking = await GrowthBooking.findById(req.params.id).populate(
//       "serviceId",
//       "name services.title"
//     );
//     if (!booking) {
//       return res.status(404).json({ success: false, message: "Not Found" });
//     }
//     res.json({ success: true, data: booking });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Update Booking
// export const updateGrowthBooking = async (req, res) => {
//   try {
//     const { status, selectedSlot, name, email, phone, message } = req.body;

//     const booking = await GrowthBooking.findByIdAndUpdate(
//       req.params.id,
//       { status, selectedSlot, name, email, phone, message },
//       { new: true }
//     );

//     if (!booking) {
//       return res.status(404).json({ success: false, message: "Not Found" });
//     }

//     res.json({ success: true, data: booking });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Delete Booking
// export const deleteGrowthBooking = async (req, res) => {
//   try {
//     const booking = await GrowthBooking.findByIdAndDelete(req.params.id);
//     if (!booking) {
//       return res.status(404).json({ success: false, message: "Not Found" });
//     }
//     res.json({ success: true, message: "Deleted Successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
// export const updateBookingStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     if (!["pending", "confirmed", "cancelled"].includes(status)) {
//       return res.status(400).json({ success: false, message: "Invalid status" });
//     }

//     const booking = await GrowthBooking.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!booking) {
//       return res.status(404).json({ success: false, message: "Booking not found" });
//     }

//     res.json({ success: true, booking });
//   } catch (error) {
//     console.error("Status update error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };


// controllers/growthBookingController.js
import GrowthBooking from "../models/GrowthBooking.js";

// Create Booking - Fixed to handle your frontend data
// export const createGrowthBooking = async (req, res) => {
//   try {
//     console.log('Request body:', req.body);
//     console.log('Files:', req.files);

//     const { 
//       serviceName, 
//       serviceCategory, 
//       name, 
//       email, 
//       phone, 
//       company, 
//       notes,
//       charges,
//       internal,
//       external
//     } = req.body;

//     // Validate required fields (matching your frontend validation)
//     if (!name || !email || !phone) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, email, and phone are required",
//       });
//     }

//     // Handle uploaded files
//     let uploadedFiles = [];
//     if (req.files && req.files.length > 0) {
//       uploadedFiles = req.files.map(file => ({
//         originalName: file.originalname,
//         filename: file.filename,
//         path: file.path,
//         mimetype: file.mimetype,
//         size: file.size
//       }));
//     }

//     // Create booking object that matches what your frontend sends
//     const bookingData = {
//       name: name.trim(),
//       email: email.toLowerCase().trim(),
//       phone: phone.trim(),
//       message: notes || '',
//     };

//     // Add optional fields
//     if (serviceName) bookingData.serviceName = serviceName;
//     if (serviceCategory) bookingData.serviceCategory = serviceCategory;
//     if (company) bookingData.company = company.trim();
//     if (charges) bookingData.charges = charges;
//     if (internal) bookingData.internalTimeline = internal;
//     if (external) bookingData.externalTimeline = external;
//     if (uploadedFiles.length > 0) bookingData.documents = uploadedFiles;

//     // For the serviceId field that your current model requires, 
//     // you can either make it optional in the model or create a dummy ObjectId
//     // For now, let's set it to null and make it optional in the model
//     bookingData.serviceId = null;

//     const booking = new GrowthBooking(bookingData);
//     await booking.save();
    
//     console.log('Booking created successfully:', booking);
    
//     res.status(201).json({ 
//       success: true, 
//       data: booking,
//       message: "Booking created successfully"
//     });

//   } catch (error) {
//     console.error("Create GrowthBooking error:", error);
    
//     // If it's a validation error, provide specific feedback
//     if (error.name === 'ValidationError') {
//       const validationErrors = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({ 
//         success: false, 
//         message: "Validation failed",
//         errors: validationErrors
//       });
//     }
    
//     // Clean up uploaded files if database save fails
//     if (req.files && req.files.length > 0) {
//       req.files.forEach(file => {
//         try {
//           if (file.path && require('fs').existsSync(file.path)) {
//             require('fs').unlinkSync(file.path);
//           }
//         } catch (cleanupError) {
//           console.error('File cleanup error:', cleanupError);
//         }
//       });
//     }
    
//     res.status(500).json({ 
//       success: false, 
//       message: "Server Error: " + error.message 
//     });
//   }
// };

// export const createGrowthBooking = async (req, res) => {
//   try {
//     const { 
//       serviceName, 
//       serviceCategory, 
//       name, 
//       email, 
//       phone, 
//       company, 
//       notes,
//       charges,
//       internal,
//       external
//     } = req.body;

//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     if (!name || !email || !phone) {
//       return res.status(400).json({ success: false, message: "Name, email, and phone are required" });
//     }

//     let uploadedFiles = [];
//     if (req.files && req.files.length > 0) {
//       uploadedFiles = req.files.map(file => ({
//         originalName: file.originalname,
//         filename: file.filename,
//         path: file.path,
//         mimetype: file.mimetype,
//         size: file.size
//       }));
//     }

//     const bookingData = {
//       userId: req.user.id,
//       name: name.trim(),
//       email: email.toLowerCase().trim(),
//       phone: phone.trim(),
//       message: notes || '',
//       documents: uploadedFiles,
//       serviceId: null
//     };

//     if (serviceName) bookingData.serviceName = serviceName;
//     if (serviceCategory) bookingData.serviceCategory = serviceCategory;
//     if (company) bookingData.company = company.trim();
//     if (charges) bookingData.charges = charges;
//     if (internal) bookingData.internalTimeline = internal;
//     if (external) bookingData.externalTimeline = external;

//     const booking = new GrowthBooking(bookingData);
//     await booking.save();

//     res.status(201).json({ success: true, data: booking, message: "Booking created successfully" });

//   } catch (error) {
//     console.error("Create GrowthBooking error:", error);
//     res.status(500).json({ success: false, message: "Server Error: " + error.message });
//   }
// };

export const createGrowthBooking = async (req, res) => {
  try {
    const { 
      serviceName, 
      serviceCategory, 
      name, 
      email, 
      phone, 
      company, 
      notes,
      charges,
      internal,
      external,
      selectedSlot,
      userId  // Now passed in body
    } = req.body;

    if (!name || !email || !phone || !userId) {
      return res.status(400).json({ success: false, message: "Name, email, phone, and userId are required" });
    }

    let uploadedFiles = [];
    if (req.files && req.files.length > 0) {
      uploadedFiles = req.files.map(file => ({
        originalName: file.originalname,
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size
      }));
    }

    const bookingData = {
      userId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      message: notes || '',
      documents: uploadedFiles,
      serviceId: null,
      selectedSlot
    };

    if (serviceName) bookingData.serviceName = serviceName;
    if (serviceCategory) bookingData.serviceCategory = serviceCategory;
    if (company) bookingData.company = company.trim();
    if (charges) bookingData.charges = charges;
    if (internal) bookingData.internalTimeline = internal;
    if (external) bookingData.externalTimeline = external;

    const booking = new GrowthBooking(bookingData);
    await booking.save();

    res.status(201).json({ success: true, data: booking, message: "Booking created successfully" });

  } catch (error) {
    console.error("Create GrowthBooking error:", error);
    res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};



// Get All Bookings
export const getGrowthBookings = async (_req, res) => {
  try {
    const bookings = await GrowthBooking.find()
      .populate("serviceId", "name services.title")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error("Get GrowthBookings error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get Booking by ID
export const getGrowthBookingById = async (req, res) => {
  try {
    const booking = await GrowthBooking.findById(req.params.id).populate(
      "serviceId",
      "name services.title"
    );
    if (!booking) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    console.error("Get GrowthBooking by ID error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update Booking
export const updateGrowthBooking = async (req, res) => {
  try {
    const { status, selectedSlot, name, email, phone, message } = req.body;

    const booking = await GrowthBooking.findByIdAndUpdate(
      req.params.id,
      { status, selectedSlot, name, email, phone, message },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    console.error("Update GrowthBooking error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete Booking
export const deleteGrowthBooking = async (req, res) => {
  try {
    const booking = await GrowthBooking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    res.json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    console.error("Delete GrowthBooking error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const booking = await GrowthBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, booking });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;  // Pass userId as URL param

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const bookings = await GrowthBooking.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error("Get bookings by user error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

