const express = require('express');
const router = express.Router();
const mongoose_connection = require('../middleware/mongoose_connection');
const sortingData = require('../modules/sortingData');
const renderingData = require('../modules/renderingData');
const outputDataLimit = require('../modules/outputDataLimit');

router.get('/', mongoose_connection, (req, res, next) => {
    if (res) {
        const db = res.locals.db;
        const collectionName = req.app.locals.collectionName;
        db.collection(collectionName).find().toArray(function(err, docs) {
            if (err) {
                res.send('Greška se pojavila prilikom učitavanja sadržaja.');
            } else {
                if (docs.length > 0) {
                    const sortedData = sortingData(docs);
                    const renderData = renderingData(sortedData);
                    const renderDataLimit = outputDataLimit(renderData, req.query.number_to_show);
                    res.render('./assets/pugs/output_with_table.pug', {
                        nav_class_input: "hidden",
                        nav_class_show: 'active-nav2',
                        sortData: renderDataLimit
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