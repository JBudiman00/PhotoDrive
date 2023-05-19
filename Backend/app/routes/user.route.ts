import express from 'express';
const router = express.Router();
const controller = require('../controllers/user.controller');

// POST new users into Users table
router.post('/add', controller.create);
//Verify user login information
router.get('/verify', controller.verify)
//Add user to album view list
router.post('/addUser', controller.addUser)
//Remove user from album view list
router.delete('/removeUser', controller.removeUser)

module.exports = router;