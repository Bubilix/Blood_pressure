const express = require('express');
const router = express.Router();
const InputValues = require('../models/inputValues');
const sortingData = require('../modules/sortingData');
const renderingData = require('../modules/renderingData');
const outputDataLimit = require('../modules/outputDataLimit');

router.get('/', (req, res, next) => {
    InputValues.find({}, function(err, docs) {
        if (err) throw err;
        else {
            const sortedData = sortingData(docs);
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
        }
    })
});

module.exports = router;