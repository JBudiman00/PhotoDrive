const multer = require('multer');
const path = require('path');
import guid from '../utils/guid'

//Get randomly generated storage path for new photos
const storage = multer.diskStorage({
    // destination: process.cwd() + '\\photos\\',
    //Custom url because files have to be stored in public on the frontend to be viewed
    destination: 'C:\\Users\\Nathan Budiman\\Documents\\GitHub\\PhotoDrive\\frontend\\public\\photos',
    filename: function (req: Request, file: any, cb: any) {
      const uuidfile = guid() + path.extname(file.originalname);
      cb(null, uuidfile);
    }
});
const upload = multer({ storage: storage });

module.exports = upload;