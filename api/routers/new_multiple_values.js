const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    if (res) {
        res.render('./assets/pugs/input_new_multiple_values.pug', {
            nav_class_input: "active-nav1",
            nav_class_show: 'hidden'
        });
    } else {
        res.status(404).write('Page not found!');
    }
});

module.exports = router;