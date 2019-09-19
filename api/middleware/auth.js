const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req, res, next) {
    
    if (!req.cookies) {
        return res.status(401). send('Neuspješna prijava!!!');
    }
    const stringJSON = JSON.stringify(req.cookies);
    const splitStringJSON = stringJSON.slice(0, -3).split('Bearer ');
    console.log( typeof splitStringJSON[1]);
    console.log(Buffer.from(config.get('jwtPrivateKey'), 'base64'));
    const secret = Buffer.from(config.get('jwtPrivateKey'), 'base64');

    jwt.verify(splitStringJSON[1], secret, function(err, payload) {
        if (err) {
            throw err;
        } else {
            console.log(payload);
            req.user = payload;
            next();
        }
    });
}