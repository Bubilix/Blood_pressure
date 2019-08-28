const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const InputValues = require('../models/inputValues');

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
router.post('/', (req, res, next) => {
    const input = new InputValues({
        _id: new mongoose.Types.ObjectId(),
        upperValue: req.body.upperValue,
        lowerValue: req.body.lowerValue
    });
    input.save(function(err, db) {
        if (err) throw err;
    });
    res.redirect('/');
});

module.exports = router;