import Booking from "../models/Bookings.js";

// Create Booking
// export const createBooking = async (req, res) => {
//   try {
//     const {
//       serviceId,
//       serviceName,
//       category,
//       fees,
//       b2b,
//       internalTimeline,
//       externalTimeline,
//       selectedSlot,
//       name,
//       email,
//       phone,
//       company,
//       notes,
//       requiredDocs,
//     } = req.body;

//     // Basic validation
//     if (!serviceId || !name) {
//       return res.status(400).json({
//         success: false,
//         message: "serviceId and name are required",
//       });
//     }

//     const uploadedDocs =
//       (req.files?.map((file, i) => ({
//         docName: requiredDocs ? requiredDocs[i] : file.originalname,
//         fileUrl: `/uploads/${file.filename}`,
//       }))) || [];

//     const booking = await Booking.create({
//       serviceId,
//       serviceName,
//       category,
//       fees,
//       b2b,
//       internalTimeline,
//       externalTimeline,
//       selectedSlot,
//       name,
//       email,
//       phone,
//       company,
//       notes,
//       documents: uploadedDocs,
//     });

//     res.status(201).json({ success: true, booking });
//   } catch (err) {
//     console.error("Booking create error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };



// export const createBooking = async (req, res) => {
//   try {
//     const {
//       userId,
//       serviceId,
//       serviceName,
//       category,
//       fees,
//       b2b,
//       internalTimeline,
//       externalTimeline,
//       selectedSlot,
//       name,
//       email,
//       phone,
//       company,
//       notes,
//       requiredDocs,
//     } = req.body;

//     if (!serviceId || !name || !userId) {
//       return res.status(400).json({
//         success: false,
//         message: "serviceId, userId, and name are required",
//       });
//     }

//     const uploadedDocs = (req.files?.map((file, i) => ({
//       docName: Array.isArray(requiredDocs) ? requiredDocs[i] : requiredDocs,
//       fileUrl: `/uploads/${file.filename}`,
//     })) || []);

//     const booking = await Booking.create({
//       userId,
//       serviceId,
//       serviceName,
//       category,
//       fees,
//       b2b,
//       internalTimeline,
//       externalTimeline,
//       selectedSlot,
//       name,
//       email,
//       phone,
//       company,
//       notes,
//       documents: uploadedDocs,
//     });

//     res.status(201).json({ success: true, booking });
//   } catch (error) {
//     console.error('Create Booking error:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const createBooking = async (req, res) => {
  try {
    const {
      userId,
      serviceId,
      serviceName,
      category,
      fees,
      b2b,
      internalTimeline,
      externalTimeline,
      selectedSlot,
      name,
      email,
      phone,
      company,
      notes,
      requiredDocs, // array or single string from frontend
    } = req.body;

    if (!serviceId || !name || !userId) {
      return res.status(400).json({
        success: false,
        message: "serviceId, userId, and name are required",
      });
    }

    // Ensure requiredDocs is always an array
    const docNames = Array.isArray(requiredDocs) ? requiredDocs : [requiredDocs];

    // Map uploaded files to document names
    const uploadedDocs = (req.files || []).map((file, i) => ({
      docName: docNames[i] || `Document ${i + 1}`,
      fileUrl: `/uploads/${file.filename}`,
    }));

    const booking = await Booking.create({
      userId,
      serviceId,
      serviceName,
      category,
      fees,
      b2b,
      internalTimeline,
      externalTimeline,
      selectedSlot,
      name,
      email,
      phone,
      company,
      notes,
      documents: uploadedDocs,
    });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error("Create Booking error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get All Bookings
export const getBookings = async (_req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get Single Booking
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update Booking Status
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatus = ["Pending", "Confirmed", "Cancelled", "Completed"];
    if (!validStatus.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete Booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const getBookingsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};