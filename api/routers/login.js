const express = require('express');
const router = express.Router();
const mongoose_connection = require('../middleware/mongoose_connection');
const checkUser = require('../middleware/checkUser');
const headerSetter = require('../middleware/headerSetter');

router.get('/', (req, res) => {
    if (res) {
        res.render('./assets/pugs/login.pug', {
            nav_class_input: 'hidden',
            nav_class_show: 'hidden'
        });
    } else {
        res.status(404).write('Page not found!');
    }
});
router.post('/', mongoose_connection,  checkUser);

module.exports = router;

