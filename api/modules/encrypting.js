const bcrypt = require('bcrypt');

module.exports = async function encrypting(password) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}