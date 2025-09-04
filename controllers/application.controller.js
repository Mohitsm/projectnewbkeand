import Application from "../models/application.model.js";

// Create new application
export const createApplication = async (req, res) => {
  try {
    const app = new Application(req.body);
    await app.save();
    res.status(201).json(app);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all applications
export const getApplications = async (req, res) => {
  try {
    const apps = await Application.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single application
export const getApplicationById = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: "Application not found" });
    res.json(app);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update application (e.g. user edits before submission)
export const updateApplication = async (req, res) => {
  try {
    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Application not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete application
export const deleteApplication = async (req, res) => {
  try {
    const deleted = await Application.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Application not found" });
    res.json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
