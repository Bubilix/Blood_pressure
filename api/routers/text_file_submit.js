const express = require('express');
const router = express.Router();
const multer = require('multer');
const browserSupport = require('../middleware/browserSupport');
const fs = require('fs');

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
      console.log(req.file);
      res.render('./assets/pugs/text_file_submit.pug', {
          nav_class_input: 'active-nav1',
          nav_class_show: 'hidden',
          input_text: fs.readFile('../uploads/tlak.txt')
      })
    } else {
      res.status(404).send('Nothing uploaded.');
    }
});

module.exports = router;