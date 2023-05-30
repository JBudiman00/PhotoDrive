"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require('multer');
const path = require('path');
const guid_1 = __importDefault(require("../utils/guid"));
//Get randomly generated storage path for new photos
const storage = multer.diskStorage({
    // destination: process.cwd() + '\\photos\\',
    //Custom url because files have to be stored in public on the frontend to be viewed
    destination: 'C:\\Users\\13145\\Documents\\GitHub\\PhotoDrive\\frontend\\public\\photos',
    filename: function (req, file, cb) {
        const uuidfile = (0, guid_1.default)() + path.extname(file.originalname);
        cb(null, uuidfile);
    }
});
const upload = multer({ storage: storage });
module.exports = upload;
