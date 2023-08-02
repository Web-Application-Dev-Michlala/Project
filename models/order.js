const mongoose = require('mongoose');


const productSchema = require('./product.js');  //SubDocument schema

const orderSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },

    products: [productSchema],
    price: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        maxlength: 24
    },
});

module.exports = mongoose.model('Order', orderSchema);