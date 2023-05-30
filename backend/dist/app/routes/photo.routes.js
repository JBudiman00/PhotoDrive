"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo.controllers');
const upload = require('../middleware/photosave');
//Basic CRUD operations
//GET photos by user ID from authentication
router.get('/', photoController.get);
//POST photos
router.post('/', upload.single('img'), photoController.create);
//PUT photos (Can update name)
router.put('/:img_id', photoController.update);
//DELETE photos
router.delete('/', photoController.remove);
//Relationship endpoints
//POST Add photo to album
router.post('/:img_id/album/:album_id', photoController.photoalbumCreate);
//DELETE photo from album 
router.delete('/:img_id/album/:album_id', photoController.photoalbumDelete);
module.exports = router;
