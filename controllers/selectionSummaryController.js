import SelectionSummary from "../models/SelectionSummary.js";
import { calculateCost } from "../services/costCalculator.js";

// POST /api/selection-summaries/calculate
export const calculateSelection = (req, res) => {
  try {
    const { selectedActivities, shareholders, totalVisas, tenure, entityType } = req.body;
    const result = calculateCost({ selectedActivities, shareholders, totalVisas, tenure, entityType });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/selection-summaries
export const saveSelection = async (req, res) => {
  try {
    const selection = new SelectionSummary(req.body);
    await selection.save();
    res.status(201).json(selection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/selection-summaries
export const getSelections = async (req, res) => {
  try {
    const selections = await SelectionSummary.find().sort({ timestamp: -1 });
    res.json(selections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
