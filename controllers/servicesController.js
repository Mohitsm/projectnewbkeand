import ServiceCategory from '../models/ServiceCategory.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getAll = asyncHandler(async (req, res) => {
  const cats = await ServiceCategory.find().sort({ name: 1 });
  res.json(cats);
});

export const getByCode = asyncHandler(async (req, res) => {
  const cat = await ServiceCategory.findOne({ code: req.params.code });
  if (!cat) return res.status(404).json({ error: 'Category not found' });
  res.json(cat);
});

export const create = asyncHandler(async (req, res) => {
  const { code, name, services } = req.body;
  if (!code || !name) return res.status(400).json({ error: 'code and name required' });
  const exists = await ServiceCategory.findOne({ code });
  if (exists) return res.status(409).json({ error: 'Category code exists' });
  const cat = new ServiceCategory({ code, name, services: services || [] });
  await cat.save();
  res.status(201).json(cat);
});

export const update = asyncHandler(async (req, res) => {
  const cat = await ServiceCategory.findOneAndUpdate({ code: req.params.code }, req.body, { new: true });
  if (!cat) return res.status(404).json({ error: 'Category not found' });
  res.json(cat);
});

export const remove = asyncHandler(async (req, res) => {
  const deleted = await ServiceCategory.findOneAndDelete({ code: req.params.code });
  if (!deleted) return res.status(404).json({ error: 'Category not found' });
  res.json({ ok: true });
});
