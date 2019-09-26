const express = require('express');
const router = express.Router();
const mongoose_connection = require('../middleware/mongoose_connection');
const sortingData = require('../modules/sortingData');
const renderingData = require('../modules/renderingData');
const outputDataLimit = require('../modules/outputDataLimit');
const {Users} = require('../models/users');
const Chart = require('chart.js');

router.get('/', mongoose_connection, (req, res, next) => {
    if (res) {
        Users.findOne({username: req.user.username}, function(err, user) {
            if (err) {
                res.send('Greška se pojavila prilikom učitavanja sadržaja.');
            } else {
                // const inputs = user.inputs.filter(function(input) {
                //     return (Date.parse(input.time) <= Date.parse(req.query.period_begin) + (23.99 * 60 * 60000))
                //     && (Date.parse(input.time) >= Date.parse(req.query.period_end));
                // });
                const inputs = user.inputs.filter(function(input) {
                    return (Date.parse(input.time) <= Date.now())
                    && (Date.parse(input.time) >= (Date.now() - (7 * 24 * 60 * 60000)));
                });
                const output = inputs.toArray();
                console.log(output);
                const objToArr = [[], [], []];
                const upperValues = [];
                const lowerValues = [];
                const dates = [];
                inputs.forEach(input => {
                    upperValues.push(input.upperValue);
                    lowerValues.push(input.lowerValue);
                    dates.push(input.time);
                });
                //console.log(upperValues);
                res.render('./assets/pugs/graphics.pug', {
                    data: JSON.stringify(upperValues),
                    labels: JSON.stringify(dates)
                });
            }
        });
    } else {
        res.status(404).send('Access to server denied!');
    }
});

module.exports = router;