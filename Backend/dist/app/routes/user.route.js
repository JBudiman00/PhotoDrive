"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller = require('../controllers/user.controller');
// POST new users into Users table
router.post('/add', controller.create);
//Verify user login information
router.get('/verify', controller.verify);
//Add user to album view list
router.post('/addUser', controller.addUser);
//Remove user from album view list
router.delete('/removeUser', controller.removeUser);
module.exports = router;
