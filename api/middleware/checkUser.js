const Users = require('../models/users');
const mongoose = require('mongoose');

module.exports = function checkUser(req, res, next) {
    const db = res.locals.db;
    db.collection('Users').findOne({
        username: req.body.username
    }).then((result) => {
        if (result) {
            res.locals.data = result;
            next();
        } else {
            db.collection('Users').insertOne(new Users ({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: res.locals.hash
                }));
            console.log('Novi korisnik dodan u kolekciju Users sa imenom ' + req.body.username);
            req.app.locals.collectionName = req.body.username;
            res.redirect('/welcome');
        };
    }).catch(err => {
        console.log('Neuspjesan pokusaj ucitavanja podataka!');
        res.redirect('/');
    });
}