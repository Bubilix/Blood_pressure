const {Users} = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

module.exports = function checkUser(req, res, next) {
    Users.findOne({ username: req.body.username }, function(err, document) {
        if (!document) {
            //if user with username not found:
            //make a hash of user password
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                //register new user
                const user = new Users ({
                    _id: new mongoose.Types.ObjectId(),
                    username: req.body.username,
                    password: hash
                    });
                //save user in a database
                user.save(function(err) {
                    if(err) throw err;
                });
                //make a token of user data and send it to client in a cookie and than get /welcome endpoint
                const token = user.generateAuthToken();
                res
                    .cookie('access_token', token)
                    .redirect('/welcome');
            });
        } else {
            //if user with username found:
            bcrypt.compare(req.body.password, document.password, function(err, equal) {
                //if user password truthy:
                if (equal == true) {
                    const user = new Users ({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username
                        });
                    //make a token of user data and send it to client in a cookie and than get /welcome endpoint
                    const token = user.generateAuthToken();
                    res
                        .cookie('access_token', token)
                        .redirect('/welcome');
                } else {
                    //if user password false get back to the start login page and suggest the password is wrong
                    res.render('./assets/pugs/wrong_password.pug', {
                        nav_class_input: 'hidden',
                        nav_class_show: 'hidden',
                        alert_message: 'Unesena pogresna lozinka!!!'
                    });
                }
            })
        }
    })
}
