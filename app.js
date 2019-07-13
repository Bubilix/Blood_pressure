const express = require('express');
const app = express();
const path = require('path');
const DOMstrings = require('./GUI/DOMstrings');
const UICtrl = require('.//Controlls.js/UIController');

app.use(express.static(path.join(__dirname, '/GUI')));
app.use(express.static(path.join(__dirname, '/GUI', 'index.pug')));

app.set('view engine', 'pug');
app.set('views', 'GUI');

app.get('/', (req, res) => {
    if (res) {
        //res.status(200).sendFile(path.join(__dirname, '/GUI', 'index.pug'));
        res.render('index', { moj_tlak: 'Moj tlak'});
    } else {
        res.status(404).write('Page not found!');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Listening on the port ${port}`)});