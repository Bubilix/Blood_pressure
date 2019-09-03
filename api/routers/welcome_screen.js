const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const InputValues = require('../models/inputValues');
const config = require('config');
const mongoose_connection = require('../middleware/mongoose_connection');

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
router.post('/', (req, res, next) => {
    const input = new InputValues({
        _id: new mongoose.Types.ObjectId(),
        upperValue: req.body.upperValue,
        lowerValue: req.body.lowerValue
    });
    res.locals.input = input;
    console.log(res.locals.input);
    next();
    //const databaseName = "firstDatabase";
    //const collectionName = "firstCollection";
    // const url = 'mongodb+srv://Bubilix:' + config.get('db.DBpassword') + '@clusterbubilix-qkwah.mongodb.net/' + databaseName + '?retryWrites=true&w=majority';
    // mongoose.connect(url, { useNewUrlParser: true }, function(err, db) {
    //     if (err) {
    //         console.log('Could not connect to MongoDB.', err)
    //     } else {
    //         console.log('Connected to MongoDB...');
    //         db.collection(collectionName).findOne({}, function(err, res) {
    //             if (err) {
    //                 db.createCollection(collectionName);
    //                 db.collection(collectionName).insertOne(input, function(err, db) {
    //                     if (err) throw err;
    //                 });
    //             } else {
    //                 db.collection(collectionName).insertOne(input, function(err, db) {
    //                     if (err) throw err;
    //                 });
    //             }
    //         })
    //     }
    // });

    //res.redirect('/');
}, mongoose_connection);

module.exports = router;