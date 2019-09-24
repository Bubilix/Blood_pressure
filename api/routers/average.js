const express = require('express');
const router = express.Router();
const sortingData = require('../modules/sortingData');
const renderingData = require('../modules/renderingData');
const outputDataLimit = require('../modules/outputDataLimit');
const mongoose_connection = require('../middleware/mongoose_connection');
const {Users} = require('../models/users');
const dateConverter = require('../modules/date_converter');

router.get('/', mongoose_connection, (req, res, next) => {
    if (res) {
        // Users.aggregate([
        //     { $group: {_id: null, upperValue: upperValue, lowerValue: lowerValue, time: req.query.period_begin},
        //     $project: { _id: 0, upperValue: 1, lowerValue: 1, time: 0} }
        // ]).then(function(result) {
        //     console.log(result);
        // }).
        // catch(function(err) {console.log(err)});
        // Users.aggregate([
        //     { $project: { _id: 0, username: 0, password: 0, inputs: 1}},
        //     { $match: {"username": req.user.username}}
        //     ]).
        //     exec(function(err, result) {
        //         console.log(result);
        //     });
        
        // console.log(req.query.period_begin);
        // console.log(dateConverter(req.query.period_begin));, 'inputs.time': 'Sep 20, 2019 08:00:00 GMT'
        Users.find({username: req.user.username, 'inputs.time': 'Sep 20, 2019 08:00:00 GMT'}, function(err, user) {
            if (err) {
                res.send('Greška se pojavila prilikom učitavanja sadržaja.');
            } else {
                console.log(user[0]);
                console.log(user[0].inputs);
                if (user[0].inputs.length > 0) {
                    const sortedData = sortingData(user[0].inputs);
                    const renderData = renderingData(sortedData);
                    const renderDataLimit = outputDataLimit(renderData, req.query.number_to_show);
                    res.render('./assets/pugs/average_values.pug', {
                        nav_class_input: "hidden",
                        nav_class_show: 'active-nav2',
                        sortData: renderDataLimit,
                        begin: req.query.period_begin,
                        end: req.query.period_end,
                        number_to_show: req.query.number_to_show
                    });
                } else {
                    res.send('Još nije unešeno niti jedno mjerenje!!!\nMolimo unesite barem jedno mjerenje da bismo mogli pokazati prosječne vrijednosti.');
                }
            }
        });
    } else {
        res.status(404).send('Access to server denied!');
    }
});

module.exports = router;