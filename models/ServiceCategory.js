import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ServiceSchema = new Schema({
  name: { type: String, required: true },
  fees: { type: String },
  b2b: { type: String },
  internal: { type: String },
  external: { type: String },
  documents: { type: String }
}, { _id: false });

const ServiceCategorySchema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  services: [ServiceSchema],
  createdAt: { type: Date, default: Date.now }
});

export default model('ServiceCategory', ServiceCategorySchema);
