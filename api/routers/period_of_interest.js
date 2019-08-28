const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    if (res) {
        res.render('./assets/pugs/period_of_interest.pug', {
            nav_class_input: "hidden",
            nav_class_show: 'active-nav2'
        });
    } else {
        res.status(404).write('Page not found!');
    }
});

module.exports = router;