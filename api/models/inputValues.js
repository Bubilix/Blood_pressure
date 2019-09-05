const mongoose = require('mongoose');

const inputSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    upperValue: {
        type: Number,
        min: [1, 'Unesite broj veci od 0!'],
        max: [400, 'Unesena pogresna vrijednost'],
        required: true
    },
    lowerValue: {
        type: Number,
        min: [1, 'Unesite broj veci od 0!'],
        max: [400, 'Unesena pogresna vrijednost'],
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('InputValues', inputSchema);