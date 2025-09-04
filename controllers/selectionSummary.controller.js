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

// Calculate estimated cost
export const calculateSummary = (req, res) => {
  try {
    const { businessActivities, shareholders, totalVisas, tenure, entityType, zoneType } = req.body;

    // simple dummy calculation – adjust as needed
    const baseCost = 5000;
    const activityCost = (businessActivities?.length || 0) * 1000;
    const shareholderCost = shareholders * 2000;
    const visaCost = totalVisas * 1500;
    const tenureCost = parseInt(tenure, 10) * 500;
    const entityCost = entityType === "LLC" ? 3000 : 2000;
    const zoneCost = zoneType === "freezone" ? 1000 : 2000;

    const estimatedCost = baseCost + activityCost + shareholderCost + visaCost + tenureCost + entityCost + zoneCost;

    const recommendedPackage = {
      name: "Standard Package",
      price: estimatedCost,
      features: ["Basic registration", "1-year license", "Standard support"]
    };

    const alternativePackages = [
      { name: "Premium Package", price: estimatedCost + 5000, features: ["Faster setup", "Extra visa", "Premium support"] },
      { name: "Budget Package", price: estimatedCost - 2000, features: ["Basic support only", "Limited activities"] }
    ];

    const costBreakdown = {
      baseCost,
      activityCost,
      shareholderCost,
      visaCost,
      tenureCost,
      entityCost,
      zoneCost
    };

    res.json({
      estimatedCost,
      recommendedPackage,
      alternativePackages,
      costBreakdown,
      isFreezone: zoneType?.toLowerCase() === "freezone"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

