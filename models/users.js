const mongoose = require('mongoose');

const { orderSchema } = require('./order.js');  //SubDocument schema

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        maxlength: 24
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    birthdate: {
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