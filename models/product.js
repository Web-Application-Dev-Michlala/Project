const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    image: [{
        type: String,
    }],
    size: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    hot: {
        type: Boolean,
        default: false
    },
    Description: {
        type: String,
        required: true
    },
    Price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    comments: [{
        type: String,
    }],
});


module.exports = mongoose.model('Product', productSchema);