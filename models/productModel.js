const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A product name must have less or equal then 40 characters'],
        minlength: [10, 'A product name must have more or equal then 10 characters'],
    },
    desc: {
        type: String,
        required: [true, 'A product must have a description'],
        trim: true,
    },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
    },
    discountId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Discount',
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be less 5.0'],
        set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'A product must have a name'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    modifiedAt: {
        type: Date,
    },
    deletedAt: {
        type: Date
    }
},{
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports  = Product;