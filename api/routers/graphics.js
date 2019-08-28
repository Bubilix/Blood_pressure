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
            const renderDataLimit = outputDataLimit(renderData, 10);
            res.render('./assets/pugs/output_with_table.pug', {
                nav_class_input: "hidden",
                nav_class_show: 'active-nav2',
                sortData: renderDataLimit
            });
        }
    })
});

module.exports = router;