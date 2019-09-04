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
router.post('/', upload.single('fileupload'), (req, res, next) => {
    if (res) {
      //read uploaded text file as string
      fs.readFile(req.file.path, 'utf-8', (err, data) => {
        if (err) throw err;
        //parse input data in object of dates, upperValues and lowerValues
        const inputs = inputTextParser(data);
        let inputsArray = [];
        for (i = 0; i < inputs.dates.length; i++) {
          //populate new database input
          const input = new InputValues({
            _id: new mongoose.Types.ObjectId(),
            time: Date.parse(date_converter(inputs.dates[i])),
            upperValue: inputs.upperValue[i],
            lowerValue: inputs.lowerValue[i]
          });
          inputsArray.push(input);
        };
        res.locals.input = inputsArray;
        //delete uploaded file, so that uploads folder is again empty (data are loaded in the database and are not longer needed)
        fs.unlink(req.file.path, (err) => {
          if (err) throw err;
        });
        next();
      });
    } else {
      //if nothing loaded alert user
      res.status(404).send('No input file found!')
    };      
}, mongoose_connection, saveDBCollection);

module.exports = router;