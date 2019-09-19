const mongoose = require('mongoose');

const inputSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    upperValue: {
        type: Number,
        required: true
    },
    lowerValue: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports.inputSchema = inputSchema;
module.exports.Inputs = mongoose.model('InputValues', inputSchema);