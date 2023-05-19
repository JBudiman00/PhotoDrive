"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller = require('../controllers/album.controller');
// POST new albums into Albums table
// Returns the album_id (So that frontend can add pics to album)
router.post('/add', controller.create);
//Get all album information for a single user
router.get('/:user_id', controller.find);
//Delete album by album_id
router.delete('/delete/:album_id', controller.del);
module.exports = router;
