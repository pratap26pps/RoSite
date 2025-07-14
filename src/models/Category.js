const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            default: '',
            trim: true,
        },
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save middleware to generate slug from name
categorySchema.pre('save', function(next) {
    if (this.isModified('name') || this.isNew) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});

export default mongoose.models.Category || mongoose.model("Category", categorySchema);