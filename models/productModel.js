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
    price: {
        type: Number,
        required: [true, 'A product must have a name'],
    },
})

const Product = mongoose.model('Product', productSchema);

module.exports  = Product;