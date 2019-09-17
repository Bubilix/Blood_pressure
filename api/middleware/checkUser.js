const Users = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

module.exports = function checkUser(req, res, next) {
    const db = res.locals.db;
    db.collection('Users').findOne({
        username: req.body.username
    }).then((result) => {
        if (result) {
            bcrypt.compare(req.body.password, result.password, function(err, equality) {
                if (equality == true) {
                    req.app.locals.collectionName = result.username;
                    console.log(result);
                    console.log(typeof result);
                    const token = result.methods.generateAuthToken();
                    res.set({token}).redirect('/welcome');
                } else {
                    res.render('./assets/pugs/wrong_password.pug', {
                        nav_class_input: 'hidden',
                        nav_class_show: 'hidden',
                        alert_message: 'Unesena pogresna lozinka!!!'
                    });       
                }
            });
        } else {
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                const user = new Users ({
                    _id: new mongoose.Types.ObjectId(),
                    username: req.body.username,
                    password: hash
                    });
                db.collection('Users').insertOne(user, function() {
                    console.log('Novi korisnik dodan u kolekciju Users sa imenom ' + req.body.username);
                    req.app.locals.collectionName = req.body.username;
                    const token = user.generateAuthToken();
                    console.log(user);
                    res.set(token).redirect('/welcome');
                });
            })
            
        };
    }).catch(err => {
        console.log('Neuspjesan pokusaj ucitavanja podataka!');
        res.redirect('/');
    });
}