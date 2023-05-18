import express from 'express';
const router = express.Router();
const controller = require('../controllers/photo.controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: process.cwd() + '\\photos\\',
    filename: function (req: Request, file: any, cb: any) {
      const uuidfile = generate_uuidv4() + path.extname(file.originalname);
      cb(null, uuidfile);
    }
});
const upload = multer({ storage: storage });
function generate_uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    function(c) {
        var uuid = Math.random() * 16 | 0, v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
        return uuid.toString(16);
    });
}

// POST new photos into photo table
router.post('/add', upload.single('img'), controller.create);
//Get all photo information for a single user
// router.get('/', controller.verify)
// //Get all photo information for a specific album
// router.get('/:albumid', controller.verify)

module.exports = router;