//const Joi = require('../node_modules/joi');
//const debug = require('debug')('app:startup');
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('config');
const mongoose = require('mongoose');
const InputValues = require('./api/models/inputValues');
const validation = require('./modules/validation');
const sortingData = require('./modules/sortingData');
const renderingData = require('./modules/renderingData');
const outputDataLimit = require('./modules/outputDataLimit');
const handleFileSelect = require('./modules/handleFileSelect');


let database = false;
let inputs = [];
const url = 'mongodb+srv://Bubilix:' + config.get('db.DBpassword') + '@clusterbubilix-qkwah.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) {
        console.log('Could not connect to MongoDB.', err)
    } else {
        database = true;
        console.log('Connected to MongoDB...');
    }
});


app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'views', 'assets', 'css')));
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    if (res) {
        res.render('index', {
            nav_class_input: 'nonactive-nav1',
            nav_class_show: 'nonactive-nav2'
        });
    } else {
        res.status(404).write('Page not found!');
    }
});
app.post('/submit', (req, res, next) => {
    const input = new InputValues({
        _id: new mongoose.Types.ObjectId(),
        upperValue: req.body.upperValue,
        lowerValue: req.body.lowerValue
    });
    if (database) {
        input.save(function(err, db) {
            if (err) throw err;
        });
    } else {
        inputs.push(input);
    }
    res.redirect('/');
});
app.get('/input_new_value', (req, res, next) => {
    if (res) {
        res.render('./assets/pugs/extend_new_measurings.pug', {
            nav_class_input: "active-nav1",
            nav_class_show: 'hidden'
        });
    } else {
        res.status(404).write('Page not found!');
    }
});
app.get('/input_multiple_values', (req, res, next) => {
    if (res) {
        res.render('./assets/pugs/extend_multiple_new_measurings.pug', {
            nav_class_input: "active-nav1",
            nav_class_show: 'hidden'
        });
    } else {
        res.status(404).write('Page not found!');
    }
});
app.get('/select_file', (req, res, next) => {
    if (res) {
        res.render('./assets/pugs/select_file.pug', {
            nav_class_input: "active-nav1",
            nav_class_show: 'hidden'
        });
    } else {
        res.status(404).write('Page not found!');
    }
});
app.get('/period_of_interest', (req, res) => {
    if (res) {
        res.render('./assets/pugs/period_of_interest.pug', {
            nav_class_input: "hidden",
            nav_class_show: 'active-nav2'
        });
    } else {
        res.status(404).write('Page not found!');
    } 
});
app.get('/average', (req, res) => {
    InputValues.find({}, function(err, docs) {
        if (err) throw err;
        else {
            const sortedData = sortingData(docs);
            const renderData = renderingData(sortedData);
            const renderDataLimit = outputDataLimit(renderData, req.query.number_to_show);
            res.render('./assets/pugs/average_values.pug', {
                nav_class_input: "hidden",
                nav_class_show: 'active-nav2',
                sortData: renderDataLimit,
                begin: req.query.period_begin,
                end: req.query.period_end,
                number_to_show: req.query.number_to_show
            });
        }
    })
});
app.get('/last_inputs', (req, res) => {
    InputValues.find({}, function(err, docs) {
        if (err) throw err;
        else {
            const sortedData = sortingData(docs);
            const renderData = renderingData(sortedData);
            const renderDataLimit = outputDataLimit(renderData, 10);
            res.render('./assets/pugs/output_with_table.pug', {
                nav_class_input: "hidden",
                nav_class_show: 'active-nav2',
                sortData: renderDataLimit
            });
        }
    })
});
app.get('/text_file_submit', (req, res) => {
    if (res) {
        const data = req.query.files;
        res.send(req.route);
    } else {
        res.status(404).write('Page not found!');
    } 
});

const port = config.get('Blood_pressure_app_port.port') || 3000;
app.listen(port, () => { console.log(`Listening on the port ${port}`) });