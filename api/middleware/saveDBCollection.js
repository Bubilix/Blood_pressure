const {Users} = require('../models/users');
const calcSum = require('../modules/calcSum');

module.exports = function saveDBCollection(req, res, next) {

    Users.findOne({username: req.user.username}, function(err, user) {
        if (user) {
            const upperValue = Math.round((parseInt(req.body.upperValue) + parseInt(calcSum(req.app.locals.upperValues))) / (req.app.locals.upperValues.length + 1));
            const lowerValue = Math.round((parseInt(req.body.lowerValue) + parseInt(calcSum(req.app.locals.lowerValues))) / (req.app.locals.lowerValues.length + 1));
            user.insertInput(upperValue, lowerValue);
            user.save(function(err) {if (err) throw err});
            req.app.locals = {upperValues: [], lowerValues: []};
        }
    });
    res.redirect('/welcome');
}
