const mongoose = require('mongoose');
const config = require('config');

module.exports = function mongoose_connection(req, res, next) {
    const databaseName = "BloodPressureApp";
    const url = 'mongodb+srv://Bubilix:' + config.get('db.DBpassword') + '@clusterbubilix-qkwah.mongodb.net/' + databaseName + '?retryWrites=true&w=majority';
    mongoose.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) {
            console.log('Could not connect to MongoDB.', err)
        } else {
            console.log('Connected to MongoDB...');
            next();
        }
    });
}
