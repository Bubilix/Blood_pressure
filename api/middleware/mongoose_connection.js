const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const InputValues = require('../models/inputValues');
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
            const input = res.locals.input;
            db.collection(collectionName).findOne({}, function(err, res) {
                if (err) {
                    db.createCollection(collectionName);
                    db.collection(collectionName).insertOne(input, function(err, db) {
                        if (err) throw err;
                    });
                } else {
                    db.collection(collectionName).insertOne(input, function(err, db) {
                        if (err) throw err;
                    });
                }
                res.redirect('/');
            })
        }
    });
}
