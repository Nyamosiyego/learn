import mongoose, { models } from 'mongoose';
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    images: [{type:String}],
    properties: {type: Object}
}, { timestamps: true })

export const Product = models.Product || model("Product", ProductSchema);