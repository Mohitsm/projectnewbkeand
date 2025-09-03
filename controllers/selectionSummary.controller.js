import SelectionSummary from "../models/selectionSummary.model.js";

// Create new summary
export const createSummary = async (req, res) => {
  try {
    const summary = new SelectionSummary(req.body);
    await summary.save();
    res.status(201).json(summary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all summaries
export const getSummaries = async (req, res) => {
  try {
    const summaries = await SelectionSummary.find();
    res.status(200).json(summaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single summary by ID
export const getSummaryById = async (req, res) => {
  try {
    const summary = await SelectionSummary.findById(req.params.id);
    if (!summary) return res.status(404).json({ message: "Summary not found" });
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update summary
export const updateSummary = async (req, res) => {
  try {
    const updated = await SelectionSummary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Summary not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete summary
export const deleteSummary = async (req, res) => {
  try {
    const deleted = await SelectionSummary.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Summary not found" });
    res.status(200).json({ message: "Summary deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
