import XLSX from 'xlsx';
import fs from 'fs';
import ServiceCategory from '../models/ServiceCategory.js';
import Booking from '../models/Bookings.js';
import asyncHandler from '../middleware/asyncHandler.js';

// parse buffer (works with memoryStorage) or path fallback
function parseExcelBufferOrPath(file) {
  if (!file) return [];
  if (file.buffer) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet, { defval: '' });
  } else {
    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet, { defval: '' });
  }
}

export const importCategories = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'File required' });
  const rows = parseExcelBufferOrPath(req.file);
  const results = [];
  for (const r of rows) {
    const code = String(r.code || r.Code || '').trim();
    const name = String(r.name || r.Name || '').trim();
    let services = [];
    if (r.servicesJSON) {
      try { services = JSON.parse(r.servicesJSON); } catch { services = []; }
    }
    if (!code || !name) { results.push({ code, ok: false, reason: 'missing code/name' }); continue; }
    const exists = await ServiceCategory.findOne({ code });
    if (exists) {
      exists.name = name; exists.services = services; await exists.save();
      results.push({ code, ok: true, action: 'updated' });
    } else {
      await ServiceCategory.create({ code, name, services });
      results.push({ code, ok: true, action: 'created' });
    }
  }
  res.json({ ok: true, results });
});

export const importBookings = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'File required' });
  const rows = parseExcelBufferOrPath(req.file);
  const results = [];
  for (const r of rows) {
    const serviceName = r.serviceName || r.ServiceName || r['service name'] || r['Service Name'];
    const serviceCategory = r.serviceCategory || r.ServiceCategory;
    const name = r.name || r.Name;
    const email = r.email || r.Email;
    const phone = r.phone || r.Phone;
    const company = r.company || r.Company;
    const notes = r.notes || r.Notes;

    if (!serviceName || !name || !email || !phone) { results.push({ row: r, ok: false, reason: 'missing required' }); continue; }
    const booking = new Booking({
      serviceName, serviceCategory, customer: { name, email, phone, company }, notes
    });
    await booking.save();
    results.push({ ok: true, id: booking._id, reference: booking.reference });
  }
  res.json({ ok: true, results });
});
