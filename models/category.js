const mongoose = require('mongoose');



const productSchema = require('./product.js')   //SubDocument schema

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
    },
    products: [productSchema],
});

module.exports = mongoose.model('Category', categorySchema);