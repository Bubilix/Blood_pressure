const encrypt = require('../modules/encrypting');
const bcrypt = require('bcrypt');

module.exports = function checkUser(req, res, next) {
    const db = res.locals.db;
    const user = res.locals.user;
    const collectionName = res.locals.collectionName;
    db.collection(collectionName).find().toArray(function(err, listOfAllUsers) {
        if (err) {
            res.status(400).send('Nista nije pronadeno na ovoj stranici.');
        } else {
            if (listOfAllUsers.length === 0) {
                encrypt(user);
                console.log(user.password);
                db.collection(collectionName).insertOne(user, function(err, db) {
                    if (err) throw err;
                });
            } else {
                console.log(user.username);
                db.collection(collectionName).find().forEach(function(doc) {
                    if (doc.username === user.username) {
                        console.log('Great!');
                    }
                });
            }           
        }
    });
    res.redirect('/welcome');
}