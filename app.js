const express = require('express');
const app = express();
const path = require('path');
const DOMstrings = require('./public/DOMstrings');
const UICtrl = require('./Controlls.js/UIController');


app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname,'views', 'assets','css')));

app.get('/', (req, res) => {
    if (res) {
        res.render('index', {
            nav_class_input: 'nonactive-nav1', 
            nav_class_show: 'nonactive-nav2',
            new_measuring_visibility: 'hidden',
            submit_multi_visibility: 'hidden'
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
            submit_multi_visibility: 'hidden'
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
            submit_multi_visibility: 'visible'
        });
    } else {
        res.status(404).write('Page not found!');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Listening on the port ${port}`)});