const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const InputValues = require('../models/inputValues');
const mongoose_connection = require('../middleware/mongoose_connection');
const saveDBCollection = require('../middleware/saveDBCollection');
const assert = require('assert');

router.get('/', (req, res, next) => {
    if (res) {
        res.render('index', {
            nav_class_input: 'nonactive-nav1',
            nav_class_show: 'nonactive-nav2'
        });
    } else {
        res.status(404).write('Page not found!');
    }
});
router.post('/', mongoose_connection, (req, res, next) => {
    const input = new InputValues({
        _id: new mongoose.Types.ObjectId(),
        upperValue: req.body.upperValue,
        lowerValue: req.body.lowerValue
    });
    const err = input.validateSync();
    if (err) {
        res.redirect('/');
        alert(err.errors[upperValue].message);
        alert(err.errors[lowerValue].message);
    } else {
        res.locals.input = [input];
        next();
    }
}, saveDBCollection);

module.exports = router;