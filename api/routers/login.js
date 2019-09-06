const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const mongoose_connection = require('../middleware/mongoose_connection');
const checkUser = require('../middleware/checkUser');

router.get('/', (req, res, next) => {
    if (res) {
        res.render('./assets/pugs/login', {
            nav_class_input: 'hidden',
            nav_class_show: 'hidden'
        });
    } else {
        res.status(404).write('Page not found!');
    }
});
router.post('/', (req,res,next) => {
    const user = new Users({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password
    });
    res.locals.collectionName = "Users";
    res.locals.user = user;
    next();
}, mongoose_connection, checkUser);

module.exports = router;