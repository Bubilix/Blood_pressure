const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    if (res) {
        const today = new Date().toISOString().slice(0,10);
        const week_before = new Date((Date.now()-604800000)).toISOString().slice(0,10);
        res.render('./assets/pugs/time_period_input.pug', {
            nav_class_input: "hidden",
            nav_class_show: 'active-nav2',
            today: today,
            week_before: week_before,
            endpoint: '/average'
        });
    } else {
        res.status(404).write('Page not found!');
    }
});

module.exports = router;