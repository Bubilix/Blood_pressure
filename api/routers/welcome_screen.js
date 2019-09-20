const express = require('express');
const router = express.Router();
const mongoose_connection = require('../middleware/mongoose_connection');
const saveDBCollection = require('../middleware/saveDBCollection');

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
router.post('/', mongoose_connection, saveDBCollection);

module.exports = router;