import express from 'express';
const router = express.Router();
const controller = require('../controllers/user.controller');

/* POST new users into Users table*/
router.post('/add', controller.create);

module.exports = router;