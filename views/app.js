const Joi = require('joi');
const debug = require('debug')('app:startup');
const express = require('express');
const app = express();
const path = require('path');
const config = require('config');


app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'assets','css')));
app.use(express.urlencoded({extended: 'true'}));

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
app.get('/input_new_value', (req, res) => {
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
app.get('/input_multiple_values', (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Listening on the port ${port}`)});