const express = require('express');
const router = express.Router();
const multer = require('multer');
const browserSupport = require('../modules/browserSupport');

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
      if (browserSupport) {
        //capture files after event is triggered
        console.log('Browser supports...');
        const reader = new FileReader();
        reader.onload = function() {
          console.log(reader.result);
          // res.render('./assets/pugs/text_file_submit.pug', {
          //   nav_class_input: 'active-nav1',
          //   nav_class_show: 'hidden',
          //   input_text: reader.readAsText(output)
          // })
        }
      };
    } else {
      res.status(404).send('Nothing uploaded.');
    }
});

module.exports = router;