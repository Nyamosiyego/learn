import mongoose, { models } from 'mongoose';
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    image: [{type:String}]
})

export const Product = models.Product || model("Product", ProductSchema);