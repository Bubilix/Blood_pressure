//const Joi = require('../node_modules/joi');
//const debug = require('debug')('app:startup');
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('config');
const mongoose = require('mongoose');
const welcome_screen = require('./api/routers/welcome_screen');
const new_values = require('./api/routers/new_values');
const new_multiple_values = require('./api/routers/new_multiple_values');
const select_file = require('./api/routers/select_file');
const period_of_interest = require('./api/routers/period_of_interest');
const average = require('./api/routers/average');
const graphics = require('./api/routers/graphics');
const text_file_submit = require('./api/routers/text_file_submit');
const validation = require('./api/modules/validation');
//const handleFileSelect = require('./api/modules/handleFileSelect');


const url = 'mongodb+srv://Bubilix:' + config.get('db.DBpassword') + '@clusterbubilix-qkwah.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) {
        console.log('Could not connect to MongoDB.', err)
    } else {
        console.log('Connected to MongoDB...');
    }
});


app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'views', 'assets', 'css')));
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());



//users inputs

//welcome screen and input data to the database
app.use('/', welcome_screen);
//input new values
app.use('/input_new_value', new_values);
//input new multiple values
app.use('/input_multiple_values', new_multiple_values);
//input values from external text file
app.use('/select_file', select_file);
//upload data from external text file to the database
app.use('/text_file_submit', text_file_submit);

//UI outputs

//input time period of interest to show values for the input time frame
app.use('/period_of_interest', period_of_interest);
//show average values in the time frame and last few values input underneath
app.use('/average', average);
//show graphically values changes over time
app.use('/last_inputs', graphics);

const port = config.get('Blood_pressure_app_port.port') || 3000;
app.listen(port, () => { console.log(`Listening on the port ${port}`) });