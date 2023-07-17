import mongoose, { model, Schema, models } from "mongoose";

const VendorSchema = new Schema({
  title: { type: String, required: true },
  email: { type: String, required: true },
  description: String,
  number: { type: Number, required: true },
  images: [{ type: String }],
  idnum: { type: String, required: true },
  kra: { type: String, required: true },
});

export const Vendor = models.Vendor || model("Vendor", VendorSchema);
