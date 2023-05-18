const express = require('express');
const router = express.Router();
const controller = require('../controllers/photodrive.controller');

/* GET programming languages. */
router.get('/', controller.get);

module.exports = router;