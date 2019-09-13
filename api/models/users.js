const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

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
    }
});

usersSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, username: this.username, password: this.password}, config.get('jwtPrivateKey'));
    return token;
}

module.exports = mongoose.model('Users', usersSchema);