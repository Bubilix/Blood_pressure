const bcrypt = require('bcrypt');

module.exports = async function encrypting(req, res) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('pass1', salt);
}