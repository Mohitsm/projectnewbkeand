// Middleware to validate category payload before creating/updating
export const validateCategory = (req, res, next) => {
  const { name, services } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Category name is required and must be a string" });
  }

  if (services && !Array.isArray(services)) {
    return res.status(400).json({ error: "Services must be an array" });
  }

  next();
};
