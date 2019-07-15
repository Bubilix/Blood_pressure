const express = require('express');
const app = express();
const path = require('path');
const DOMstrings = require('./public/DOMstrings');
const UICtrl = require('./Controlls.js/UIController');


app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    if (res) {
        res.render('index');
    } else {
        res.status(404).write('Page not found!');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Listening on the port ${port}`)});