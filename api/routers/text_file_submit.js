const express = require('express');
const router = express.Router();
const multer = require('multer');

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
    } else {
      res.status(404).send('Nothing uploaded.');
    }
});

module.exports = router;