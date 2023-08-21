const mongoose = require('mongoose');


const productSchema = require('./product.js');  //SubDocument schema

const orderSchema = new mongoose.Schema({
    
    date: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true,
        maxlength: 24
    },
    products: [productSchema],
});

module.exports = mongoose.model('Order', orderSchema);