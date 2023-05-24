"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album.controllers');
//Basic CRUD operations
//GET albums (Bearer Authentication contains user_id)
router.get('/', albumController.get);
//POST albums
router.post('/', albumController.create);
//PUT albums (Can only update name)
router.put('/:album_id', albumController.update);
//DELETE albums
router.delete('/:album_id', albumController.remove);
//Relational endpoints
//Add people to album viewlist
router.post('/:album_id/users/:user_id', albumController.albumuserCreate);
//Remove people from album viewlist
router.delete('/:album_id/users/:user_id', albumController.albumuserDelete);
module.exports = router;
