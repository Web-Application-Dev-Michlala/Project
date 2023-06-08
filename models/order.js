const mongoose = require('mongoose');

const productSchema = require('./product.js');  //SubDocument schema

const orderSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    products: [productSchema],
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Order', orderSchema);