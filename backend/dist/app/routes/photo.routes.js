"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo.controllers');
const upload = require('../middleware/photosave');
//Basic CRUD operations
//GET photos by user ID
router.get('/:user_id', photoController.get);
//POST photos
router.post('/', upload.single('img'), photoController.create);
//PUT photos (Can update name)
router.put('/:img_id', photoController.update);
//DELETE photos
router.delete('/:img_id', photoController.remove);
module.exports = router;
