import express from 'express';
const router = express.Router();
const controller = require('../controllers/album.controller');

// POST new albums into Albums table
// Returns the album_id (So that frontend can add pics to album)
router.post('/add', controller.create);
//Get all album information for a single user
router.get('/:user_id', controller.find)
//Add photo to album
router.post('/addPhoto', controller.addPhoto)
//remove photo from album
router.delete('/deletePhoto', controller.delPhoto)
//Delete album by album_id
router.delete('/delete/:album_id', controller.del)


module.exports = router;