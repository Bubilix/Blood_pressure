const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req, res, next) {
    
    if (!req.cookies) {
        return res.status(401). send('Neuspješna prijava!!!');
    }
    const stringJSON = JSON.stringify(req.cookies);
    const splitStringJSON = stringJSON.slice(0, -2).split(':"');

    jwt.verify(splitStringJSON[1], config.get('jwtPrivateKey'), function(err, payload) {
        if (err) {
            throw err;
        } else {
            req.user = payload;
            next();
        }
    });
}