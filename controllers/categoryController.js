import Category from "../models/Category.js";
import XLSX from "xlsx";

// Create category with services
export const createCategory = async (req, res) => {
  try {
    const { name, services } = req.body;
    const category = new Category({ name, services });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { name, services } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, services },
      { new: true }
    );
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Upload Excel for services
// export const uploadExcel = async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) return res.status(400).json({ message: "No file uploaded" });

//     const workbook = XLSX.readFile(file.path);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const rows = XLSX.utils.sheet_to_json(sheet);

//     const { categoryName } = req.body;
//     let category = await Category.findOne({ name: categoryName });

//     if (!category) {
//       category = new Category({ name: categoryName, services: rows });
//     } else {
//       category.services.push(...rows);
//     }

//     await category.save();
//     res.json({ message: "Excel data uploaded", category });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// controllers/categoryController.js


// Excel upload controller
// Adjust path if needed


export const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read Excel file
    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const grouped = {};

    // Group services by Category name
    rows.forEach((row) => {
      if (!row || !row.Category) return;

      const categoryName = row.Category.trim();
      if (!categoryName) return;

      if (!grouped[categoryName]) grouped[categoryName] = [];

      grouped[categoryName].push({
        name: row["Service Name"] || "",
        fees: row.Fees || "",
        b2bCosting: row.b2bCosting || "",  // Save as string as per your schema
        internalTimeline: row.InternalTimeline || "",
        externalTimeline: row.ExternalTimeline || "",
        documentsRequired: row.DocumentsRequired || ""
      });
    });

    // Pre-fetch existing categories
    const existingCategories = await Category.find({});
    const categoryMap = existingCategories.reduce((map, cat) => {
      map[cat.name] = cat;
      return map;
    }, {});

    // Save categories and services
    for (const [categoryName, services] of Object.entries(grouped)) {
      let category = categoryMap[categoryName];

      if (category) {
        category.services = services;  // Overwrite old services
        await category.save();
      } else {
        await Category.create({ name: categoryName, services });
      }
    }

    res.json({ message: "Excel uploaded and categories saved successfully" });
  } catch (error) {
    console.error("Excel upload error:", error.stack);
    res.status(500).json({ message: "Failed to upload Excel", error: error.message });
  }
};


