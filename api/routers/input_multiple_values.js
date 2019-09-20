const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    if (res) {
        res.render('./assets/pugs/input_multiple_values.pug', {
            nav_class_input: "active-nav1",
            nav_class_show: 'hidden'
        });
    } else {
        res.status(404).write('Page not found!');
    }
});
router.post('/', (req, res, next) => {
    if (res) {
        req.app.locals.upperValues.push(parseInt(req.body.upperValue));
        req.app.locals.lowerValues.push(parseInt(req.body.lowerValue));
        res.redirect('/input_multiple_values');
    } else {
        res.status(404).write('Page not found!');
    }
});

module.exports = router;