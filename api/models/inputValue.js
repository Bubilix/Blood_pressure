const mongoose = require('mongoose');

const inputSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    upperValue: Number,
    lowerValue: Number,
    time: {
        type: Date,
        default: Date.now    
    }
});

module.exports = mongoose.model('InputValues', inputSchema);