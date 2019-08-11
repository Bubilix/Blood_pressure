//const Joi = require('../node_modules/joi');
//const debug = require('debug')('app:startup');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const config = require('config');
const mongoose = require('mongoose');
const InputValues = require('./api/models/inputValue');
const validation = require('./middleware/validation');

mongoose.connect('mongodb+srv://Bubilix:' + config.get('db.DBpassword') + '@clusterbubilix-qkwah.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB.', err));



app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'views', 'assets','css')));
app.use(bodyParser.urlencoded({extended: 'true'}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    if (res) {
        res.render('index', {
            nav_class_input: 'nonactive-nav1',
            nav_class_show: 'nonactive-nav2',
            new_measuring_visibility: 'hidden',
            multiple: ''
        });
    } else {
        res.status(404).write('Page not found!');
    }
});
app.post('/', (req, res, next) => {
    //if (validation(req.body)) {
        const input = new InputValues({
            _id: new mongoose.Types.ObjectId(),
            upperValue: req.body.upperValue,
            lowerValue: req.body.lowerValue
        });
        input
            .save()
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err)
            });
        res.status(201).json({
            message: 'Handling post requests to inputValues',
            createdProduct: input
        });
    //}
})
app.get('/input_new_value', (req, res, next) => {
    if (res) {
        res.render('index', {
            nav_class_input: "active-nav",
            nav_class_show: 'hidden',
            new_measuring_visibility: 'visible',
            multiple: ''
        });
    } else {
        res.status(404).write('Page not found!');
    }
});
app.get('/input_multiple_values', (req, res, next) => {
    if (res) {
        res.render('index', {
            nav_class_input: "active-nav",
            nav_class_show: 'hidden',
            new_measuring_visibility: 'visible',
            multiple: 'yes'
        });
    } else {
        res.status(404).write('Page not found!');
    }
});

const port = config.get('Blood_pressure_app_port.port') || 3000;
app.listen(port, () => {console.log(`Listening on the port ${port}`)});