const express = require('express');
const router = express.Router();
const browserSupport = require('../modules/browserSupport');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './api/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage });

router.post('/', upload.single('fileupload'), (req, res) => {
        if (browserSupport) {
            //capture files after event is triggered
            const file = event.target.files[0];
            // const reader = new FileReader();
            console.log(file);
        }
});

module.exports = router;