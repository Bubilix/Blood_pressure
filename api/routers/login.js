const express = require('express');
const router = express.Router();
const mongoose_connection = require('../middleware/mongoose_connection');
const checkUser = require('../middleware/checkUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    if (res) {
        res.render('./assets/pugs/login.pug', {
            nav_class_input: 'hidden',
            nav_class_show: 'hidden'
        });
    } else {
        res.status(404).write('Page not found!');
    }
});
router.post('/', mongoose_connection, (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        res.locals.hash = hash;
        next();
    })
}, checkUser, (req, res) => {
    bcrypt.compare(req.body.password, res.locals.data.password, function(err, equality) {
        if (equality == true) {
            req.app.locals.collectionName = res.locals.data.username;
            res.redirect('/welcome');
        } else {
            res.render('./assets/pugs/wrong_password.pug', {
                nav_class_input: 'hidden',
                nav_class_show: 'hidden',
                alert_message: 'Unesena pogresna lozinka!!!'
            });       
        }
    })
});

module.exports = router;

