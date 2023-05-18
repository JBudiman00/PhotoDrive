import express from 'express';
const router = express.Router();
const controller = require('../controllers/user.controller');

// POST new albums into Albums table
router.post('/add', controller.create);
//Get all album information for a single user
router.get('/', controller.verify)

module.exports = router;