const encrypt = require('../modules/encrypting');
const bcrypt = require('bcrypt');

module.exports = function saveDBCollection(req, res, next) {
    const db = res.locals.db;
    const user = res.locals.user;
    const collectionName = res.locals.collectionName;
    db.collection(collectionName).find().toArray(function(err, listOfAllUsers) {
        if (err) {
            db.createCollection(collectionName);
            user.password = encrypt(user.password);
            db.collection(collectionName).insertOne(user, function(err, db) {
                if (err) throw err;
            });
        } else {
            for (let member in listOfAllUsers) {
                if (member.username === user.username) {                    
                    user.password = encrypt(user.password);
                    bcrypt.compare(user.password, member.password);
                }
            }
        }
    });
    res.redirect('/welcome');
}