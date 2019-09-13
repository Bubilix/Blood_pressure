const bcrypt = require('bcrypt');

module.exports = function checkUser(req, res, next) {
    const db = res.locals.db;
    const user = res.locals.user;
    const collectionName = req.app.locals.collectionName;
    db.collection(collectionName).findOne({
        username: user.username
    }).then((result) => {
        if (result) {
            if (result.password === user.password) {
                console.log('Korisnik smije koristiti stranicu');
                req.app.locals.collectionName = user.username;
            }
        } else {
            db.collection(collectionName).insertOne(user, function(err, db) {
                if (err) throw err;
                console.log('Novi korisnik dodan u kolekciju ' + collectionName + ' sa imenom ' + user.username);
                req.app.locals.collectionName = user.username;
            });
        }
    }).catch(err => console.log('Neuspjesan pokusaj ucitavanja podataka!'));
    res.redirect('/welcome');
}