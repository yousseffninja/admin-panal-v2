const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A product name must have less or equal then 40 characters'],
        minlength: [10, 'A product name must have more or equal then 10 characters'],
    }
})