const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({
    name: {
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
    description: {
        type: String,
        required: true
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    comments: [{
        type: String,
    }],
});


module.exports = mongoose.model('Product', productSchema);