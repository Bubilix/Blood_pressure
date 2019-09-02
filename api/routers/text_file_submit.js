const express = require('express');
const router = express.Router();
const multer = require('multer');
const inputTextParser = require('../modules/inputTextParser');
const fs = require('fs');
const mongoose = require('mongoose');
const InputValues = require('../models/inputValues');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './api/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
const upload = multer({ storage: storage })

router.post('/', upload.single('fileupload'), (req, res, next) => {
    if (res) {
      fs.readFile(req.file.path, 'utf-8', (err, data) => {
        if (err) throw err;
        // res.render('./assets/pugs/text_file_submit.pug', {
        //   nav_class_input: 'active-nav1',
        //   nav_class_show: 'hidden',
        //   input_text: JSON.stringify(meanOfAllInputs(data))
        //   })
        const inputs = inputTextParser(data);
        console.log(inputs);
        for (i = 0; i < inputs.dates.length; i++) {
          const input = new InputValues({
            _id: new mongoose.Types.ObjectId(),
            time: Date.parse(inputs.dates[i]),
            upperValue: inputs.upperValue[i],
            lowerValue: inputs.lowerValue[i]
          });
          console.log(inputs.dates[i]);
          console.log(input);
          // input.save(function(err, db) {
          //   if (err) throw err;
          // });
        }
      })
      res.redirect('/');
      fs.unlink(req.file.path, (err) => {
        if (err) throw err;
      })
    } else {
      res.status(404).send('No input file found!')
    };      
});

module.exports = router;