export const validateApplication = (req, res, next) => {
  const { categoryId, formData } = req.body;

  if (!categoryId) {
    return res.status(400).json({ message: "categoryId is required" });
  }

  if (!formData || typeof formData !== "object") {
    return res.status(400).json({ message: "formData must be provided" });
  }

  next();
};
