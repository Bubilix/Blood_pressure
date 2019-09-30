const express = require('express');
const router = express.Router();
const sortingData = require('../modules/sortingData');
const renderingData = require('../modules/renderingData');
const outputDataLimit = require('../modules/outputDataLimit');
const mongoose_connection = require('../middleware/mongoose_connection');
const {Users} = require('../models/users');
const calcAvgArray = require('../modules/calcAvgArray');

router.get('/', mongoose_connection, (req, res, next) => {
    if (res) {
        Users.findOne({username: req.user.username}, function(err, user) {
            if (err) {
                res.send('Greška se pojavila prilikom učitavanja sadržaja.');
            } else {
                if (user.inputs.length > 0) {
                    const inputs = user.inputs.filter(function(input) {
                        return (Date.parse(input.time) <= Date.parse(req.query.period_begin) + (23.99 * 60 * 60000))
                        && (Date.parse(input.time) >= Date.parse(req.query.period_end));
                    });
                    if (inputs.length > 0) {
                        const objToArr = [[], []];
                        inputs.forEach(input => {
                            objToArr[0].push(input.upperValue);
                            objToArr[1].push(input.lowerValue);
                        });
                        const avg_upper = calcAvgArray(objToArr[0]);
                        const avg_lower = calcAvgArray(objToArr[1]);
                        const sortedData = sortingData(inputs);
                        const renderData = renderingData(sortedData);
                        const renderDataLimit = outputDataLimit(renderData, req.query.number_to_show);
                        res.render('./assets/pugs/average_values.pug', {
                            nav_class_input: "hidden",
                            nav_class_show: 'hidden',
                            sortData: renderDataLimit,
                            begin: req.query.period_begin,
                            end: req.query.period_end,
                            avg_upper: avg_upper,
                            avg_lower: avg_lower
                       });
                    } else {
                        res.send('Još nije unešeno niti jedno mjerenje!!!\nMolimo unesite barem jedno mjerenje da bismo mogli pokazati prosječne vrijednosti.');
                    }
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