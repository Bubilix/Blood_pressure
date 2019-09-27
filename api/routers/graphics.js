const express = require('express');
const router = express.Router();
const mongoose_connection = require('../middleware/mongoose_connection');
const {Users} = require('../models/users');

router.get('/', mongoose_connection, (req, res, next) => {
    if (res) {
        Users.findOne({username: req.user.username}, function(err, user) {
            if (err) {
                res.send('Greška se pojavila prilikom učitavanja sadržaja.');
            } else {
                const inputs = user.inputs.filter(function(input) {
                    return (Date.parse(input.time) <= Date.parse(req.query.period_begin) + (23.99 * 60 * 60000))
                    && (Date.parse(input.time) >= Date.parse(req.query.period_end));
                });
                const timeString = [];
                inputs.forEach(input => {
                    timeString.push(input.time.toISOString().slice(0, 10));
                });
                if (inputs.length > 0) {
                    const objToArr = [[], []];
                    inputs.forEach(input => {
                        objToArr[0].push(input.upperValue);
                        objToArr[1].push(input.lowerValue);
                    });
                    res.render('./assets/pugs/graphics.pug', {
                        upperValues: JSON.stringify(objToArr[0]),
                        lowerValues: JSON.stringify(objToArr[1]),
                        time: JSON.stringify(timeString)
                    });
                } else {
                    res.render('./assets/pugs/no_output.pug');
                };             
            }
        });
    } else {
        res.status(404).send('Access to server denied!');
    }
});

module.exports = router;