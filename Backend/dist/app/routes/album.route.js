"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller = require('../controllers/user.controller');
// POST new albums into Albums table
router.post('/add', controller.create);
//Get all album information for a single user
router.get('/', controller.verify);
module.exports = router;
