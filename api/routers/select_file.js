const express = require('express');
const router = express.Router();
const handleFileSelect = require('../modules/handleFileSelect');

router.get('/', (req, res, next) => {
    if (res) {
        res.render('./assets/pugs/select_file.pug', {
            nav_class_input: "active-nav1",
            nav_class_show: 'hidden',
            handleFileSelect: handleFileSelect
        });
    } else {
        res.status(404).write('Page not found!');
    }
});

module.exports = router;