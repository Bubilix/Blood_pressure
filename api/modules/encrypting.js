const bcrypt = require('bcrypt');

module.exports = async function encrypting(user) {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(user, salt);
    } catch (err) {
        res.status(400).send('Problem with log in...');
    }
}