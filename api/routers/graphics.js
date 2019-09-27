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
                const inputs = user.inputs.filter(function(input) {
                    return (Date.parse(input.time) <= Date.parse(req.query.period_begin) + (23.99 * 60 * 60000))
                    && (Date.parse(input.time) >= Date.parse(req.query.period_end));
                });
                // const inputs = user.inputs.filter(function(input) {
                //     return (Date.parse(input.time) <= Date.now())
                //     && (Date.parse(input.time) >= (Date.now() - (7 * 24 * 60 * 60000)));
                // });
                if (inputs.length > 0) {
                    const objToArr = [[], [], []];
                    inputs.forEach(input => {
                        objToArr[0].push(input.time);
                        objToArr[1].push(input.upperValue);
                        objToArr[2].push(input.lowerValue);
                    });
                    res.render('./assets/pugs/graphics.pug', {
                        upperValues: JSON.stringify(objToArr[1]),
                        lowerValues: JSON.stringify(objToArr[2]),
                        time: JSON.stringify(objToArr[0])
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