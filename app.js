const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const config = require('config');
const login = require('./api/routers/login');
const welcome_screen = require('./api/routers/welcome_screen');
const input_values = require('./api/routers/input_values');
const input_multiple_values = require('./api/routers/input_multiple_values');
const select_file = require('./api/routers/select_file');
const period_of_interest = require('./api/routers/period_of_interest');
const average = require('./api/routers/average');
const graphics = require('./api/routers/graphics');
const auth = require('./api/middleware/auth');


//show on screen .pug files from ./views folder
app.set('views', './views');
app.set('view engine', 'pug');
//provide access to .css files to graphicaly shape .pugs
app.use(express.static(path.join(__dirname, 'views', 'assets', 'css')));
//req and res body parsing
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(cookieParser());
app.locals = {upperValues: [], lowerValues: []};

//if jwtPrivatekey not defined app is not allowed to work
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtprivateKey is not defined');
    process.exit(1);
}

//users inputs

//login form
app.use('/', login);
//welcome screen and input data to the database
app.use('/welcome', auth, welcome_screen);
//input new values
app.use('/input_values', auth, input_values);
//input new multiple values
app.use('/input_multiple_values', auth, input_multiple_values);
//input values from external text file
app.use('/select_file', auth, select_file);

//UI outputs

//input time period of interest to show values for the input time frame
app.use('/period_of_interest', period_of_interest);
//show average values in the time frame and last few values input underneath
app.use('/average', auth, average);
//show graphically values changes over time
app.use('/last_inputs', auth, graphics);

//listening on port for browser connection
const port = (config.get('Blood_pressure_app_port.port') || 3000);
app.listen(port, () => { console.log(`Listening on the port ${port}`) });