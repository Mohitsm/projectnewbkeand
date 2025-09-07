import GrowthService from "../models/GrowthService.js";
import XLSX from "xlsx";

// ✅ Create a new category with services
export const createGrowthService = async (req, res) => {
  try {
    const { name, services } = req.body;

    const growthService = new GrowthService({
      name,
      services,
    });

    await growthService.save();
    res.status(201).json({ success: true, data: growthService });
  } catch (error) {
    console.error("Create GrowthService error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get all categories with services
export const getGrowthServices = async (_req, res) => {
  try {
    const data = await GrowthService.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get single category by ID
export const getGrowthServiceById = async (req, res) => {
  try {
    const data = await GrowthService.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Update category + services
export const updateGrowthService = async (req, res) => {
  try {
    const { name, services } = req.body;

    const data = await GrowthService.findByIdAndUpdate(
      req.params.id,
      { name, services },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Delete category
export const deleteGrowthService = async (req, res) => {
  try {
    const data = await GrowthService.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    res.json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Excel Upload (bulk insert/update)
export const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const grouped = {};

    sheetData.forEach((row) => {
      const categoryName = row.Category?.trim();
      if (!grouped[categoryName]) grouped[categoryName] = [];

      grouped[categoryName].push({
        title: row.Title,
        fees: row.Fees,
        internalTimeline: row["Internal Timeline"] || row.InternalTimeline,
        externalTimeline: row["External Timeline"] || row.ExternalTimeline,
        requiredDocs: row["Required Documents"] || row.RequiredDocs,
        discountedPrice: row["Discounted Price"] || row.DiscountedPrice,
      });
    });

    // Insert/update each category
    for (const [categoryName, services] of Object.entries(grouped)) {
      await GrowthService.findOneAndUpdate(
        { name: categoryName },
        { $set: { services } },
        { upsert: true, new: true }
      );
    }

    res.json({ success: true, message: "Excel data uploaded successfully" });
  } catch (error) {
    console.error("Excel upload error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


