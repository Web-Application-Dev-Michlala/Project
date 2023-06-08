const mongoose = require('mongoose');


const shopSchema = new mongoose.Schema({
    locationX: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    locationY: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
});

module.exports = mongoose.model('Shop', shopSchema);