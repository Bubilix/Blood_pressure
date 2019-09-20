const express = require('express');
const router = express.Router();
const multer = require('multer');
const inputTextParser = require('../modules/inputTextParser');
const fs = require('fs');
const mongoose = require('mongoose');
const InputValues = require('../models/inputValues');
const date_converter = require('../modules/date_converter');
const mongoose_connection = require('../middleware/mongoose_connection');
const saveDBCollection = require('../middleware/saveDBCollection');
const {Users} = require('../models/users');

router.get('/', (req, res, next) => {
    if (res) {
        res.render('./assets/pugs/select_file.pug', {
            nav_class_input: "active-nav1",
            nav_class_show: 'hidden'
        });
    } else {
        res.status(404).write('Page not found!');
    }
});

//define location to temporarily store text file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './api/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
const upload = multer({ storage: storage })

//add text file input data parsed to a database
router.post('/', upload.single('fileupload'), mongoose_connection, (req, res, next) => {
    if (res) {
      //read uploaded text file as string
      fs.readFile(req.file.path, 'utf-8', (err, data) => {
        if (err) throw err;
        //parse input data in object of dates, upperValues and lowerValues
        const inputs = inputTextParser(data);
        //delete uploaded file, so that uploads folder is again empty (data are loaded in the database and are not longer needed)
        fs.unlink(req.file.path, (err) => {
          if (err) throw err;
        });
        //find user in a database according to his username
        Users.findOne({username: req.user.username}, function(err, user) {
          if (user) {
            //insert all input values to a temproary array of inputs
            for (i = 0; i < inputs.dates.length; i++) {
              user.insertInput(inputs.upperValue[i], inputs.lowerValue[i], date_converter(inputs.dates[i]));
            };
            //when all values inserted save it to a database
            user.save(function(err) {if (err) throw err});
          } else {
            res.status(400).send('User not found!');
          }
        });
        //after all values input return back to the main page /welcome
        res.redirect('/welcome');
      });
    } else {
      //if nothing loaded alert user
      res.status(404).send('No input file found!')
    };      
});

module.exports = router;