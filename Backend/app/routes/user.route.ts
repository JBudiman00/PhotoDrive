import express from 'express';
const router = express.Router();
const controller = require('../controllers/user.controller');

// POST new users into Users table
router.post('/add', controller.create);
//Verify user login information
router.get('/verify', controller.verify)

module.exports = router;