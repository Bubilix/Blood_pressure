const mongoose = require('mongoose');
const config = require('config');

module.exports = function mongoose_connection(req, res, next) {
    const databaseName = "firstDatabase";
    const collectionName = "firstCollection";
    const url = 'mongodb+srv://Bubilix:' + config.get('db.DBpassword') + '@clusterbubilix-qkwah.mongodb.net/' + databaseName + '?retryWrites=true&w=majority';
    mongoose.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) {
            console.log('Could not connect to MongoDB.', err)
        } else {
            console.log('Connected to MongoDB...');
            res.locals.db = db;
            res.locals.databaseName = databaseName;
            res.locals.collectionName = collectionName;
            next();
        }
    });
}
