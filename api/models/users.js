const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const {inputSchema} = require('./inputValues');

const usersSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    inputs: [inputSchema]
});
usersSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, username: this.username}, config.get('jwtPrivateKey'));
    return token;
};
usersSchema.methods.insertInput = function(upperValue, lowerValue, time) {
    this.inputs.push({upperValue: upperValue, lowerValue: lowerValue, time: time});
};

module.exports.Users = mongoose.model('Users', usersSchema);