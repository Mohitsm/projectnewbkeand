import BusinessSetup from "../models/BusinessSetup.js";

// Create new record
export const createBusinessSetup = async (req, res) => {
  try {
    const setup = new BusinessSetup(req.body);
    const saved = await setup.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all records
export const getBusinessSetups = async (req, res) => {
  try {
    const setups = await BusinessSetup.find();
    res.json(setups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get by ID
export const getBusinessSetupById = async (req, res) => {
  try {
    const setup = await BusinessSetup.findById(req.params.id);
    if (!setup) return res.status(404).json({ message: "Not found" });
    res.json(setup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update by ID
export const updateBusinessSetup = async (req, res) => {
  try {
    const updated = await BusinessSetup.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete by ID
export const deleteBusinessSetup = async (req, res) => {
  try {
    const deleted = await BusinessSetup.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
