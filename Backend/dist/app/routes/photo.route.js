"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller = require('../controllers/photo.controller');
const multer = require('multer');
const path = require('path');
//Get randomly generated storage path for new photos
const storage = multer.diskStorage({
    destination: process.cwd() + '\\photos\\',
    filename: function (req, file, cb) {
        const uuidfile = generate_uuidv4() + path.extname(file.originalname);
        cb(null, uuidfile);
    }
});
const upload = multer({ storage: storage });
//Function to generate GUIDs
function generate_uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var uuid = Math.random() * 16 | 0, v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
        return uuid.toString(16);
    });
}
// POST new photos into photo table
router.post('/add', upload.single('img'), controller.create);
//Get all photo information for a single user
router.get('/:user_id', controller.find);
//Delete photo by img_id
router.delete('/delete/:img_id', controller.del);
module.exports = router;
