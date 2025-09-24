import Trading from "../models/Trading.js";

// Create new trading
export const createTrading = async (req, res) => {
  try {
    const trade = new Trading(req.body);
    await trade.save();
    res.status(201).json({ message: "Trading saved", data: trade });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tradings
export const getTradings = async (req, res) => {
  try {
    const trades = await Trading.find();
    res.json(trades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single trading by ID
export const getTradingById = async (req, res) => {
  try {
    const trade = await Trading.findById(req.params.id);
    if (!trade) return res.status(404).json({ message: "Not found" });
    res.json(trade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update trading
export const updateTrading = async (req, res) => {
  try {
    const trade = await Trading.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!trade) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Updated successfully", data: trade });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete trading
export const deleteTrading = async (req, res) => {
  try {
    const trade = await Trading.findByIdAndDelete(req.params.id);
    if (!trade) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
