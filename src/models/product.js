import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    images: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        default: '',
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    isTopSeller: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { 
    timestamps: true 
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
