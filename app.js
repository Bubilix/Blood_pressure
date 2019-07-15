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
        res.render('index', { nav_class: 'nonactive-nav', new_measuring_visibility: 'hidden'});
        //res.sendFile('index.html', {root: __dirname+'/original_html'});
    } else {
        res.status(404).write('Page not found!');
    }
});
app.get('/input_new_measuring', (req, res) => {
    if (res) {
        res.render('index', { nav_class: "active_nav", new_measuring_visibility: 'visible'});
    } else {
        res.status(404).write('Page not found!');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Listening on the port ${port}`)});