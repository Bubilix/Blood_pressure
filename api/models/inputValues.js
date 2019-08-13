const mongoose = require('mongoose');

const inputSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    upperValue: {
        type: Number,
        min: 1,
        max: 400,
        required: true
    },
    lowerValue: {
        type: Number,
        min: 1,
        max: 300,
        required: true
    },
    time: {
        type: Date,
        default: Date.now    
    }
});

module.exports = mongoose.model('InputValues', inputSchema);