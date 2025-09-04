import Booking from "../models/Booking.js";

// ✅ Create Booking
export const createBooking = async (req, res) => {
  try {
    const data = req.body;

    const booking = new Booking({
      serviceId: data.serviceId,
      serviceName: data.serviceName || "Unknown Service",
      packageType: data.packageType,
      selectedSlot: data.slot, // mapping UI -> DB field
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message,
      preferredContact: data.preferredContact,
    });

    await booking.save();
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// ✅ Get All Bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get Booking By ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Update Booking
export const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        selectedSlot: req.body.slot || req.body.selectedSlot, // map again
      },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, booking: updatedBooking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// ✅ Delete Booking
export const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.json({ success: true, message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
