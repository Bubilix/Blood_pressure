const bcrypt = require('bcrypt');
const express = require('express');
const app = express();

module.exports = function checkUser(req, res, next) {
    const db = res.locals.db;
    const user = res.locals.user;
    const collectionName = req.app.locals.collectionName;
    db.collection(collectionName).find().toArray(function(err, listOfAllUsers) {
        if (err) {
            res.status(400).send('Nista nije pronadeno na ovoj stranici.');
        } else {
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
        }
    });
    res.redirect('/welcome');
}