const mongoose = require('mongoose');

const { orderSchema } = require('./order.js');  //SubDocument schema

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        maxlength: 24
    },
    Password: {
        type: String,
        required: true,
    },
    Age: {
        type: Number,
    },
    Birthdate: {
        type: Date,
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    purchaseHistory: [{ 
        type: [orderSchema],
    }],
});

module.exports = mongoose.model('User', userSchema);
