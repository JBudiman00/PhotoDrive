"use strict";
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
//Basic CRUD operations
//GET users
router.get('/:user_id', userController.get);
//POST users
router.post('/', userController.create);
//PUT users
//DELETE users
module.exports = router;
