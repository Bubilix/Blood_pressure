const express = require('express');
const app = express();
const path = require('path');
const DOMs = require('DOMstrings');

app.use(express.static(path.join(__dirname, 'GUI')));

app.use(DOMs);

app.get('/', (req, res) => {
    if (res) {
        res.status(200).sendFile(path.join(__dirname, 'GUI', 'index.html'));
        console.log(DOMs.nav);
    } else {
        res.status(404).send('Page not found!');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Listening on the port ${port}`)});