import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String,
    description: String,
    price: Number,
    category: String,
    isTopSeller: Boolean,
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
