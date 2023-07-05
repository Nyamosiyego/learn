import mongoose, { models } from "mongoose";
const { Schema, model } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  properties: [{ type: Object }],
});

export const Category = models?.Category || model("Category", CategorySchema);