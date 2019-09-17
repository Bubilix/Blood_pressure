const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req, res, next) {
    
    console.log(req.headers['authorization']);
    req.token = req.headers['authorization'];
    if (!req.token) {
        return res.status(401). send('Niste se prijavili u sustav!!!');
    }

    try {
        const payload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = payload;
        next();
    } catch (ex) {
        res.status(400). send('Invalid token.');
    }
}