"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const jwt = require('jsonwebtoken');
const passport_1 = __importDefault(require("passport"));
//Basic CRUD operations
//GET users
router.get('/:user_id', userController.get);
//POST users
router.post('/', userController.create);
//PUT users
//DELETE users
//Login user
router.post('/login', (req, res) => {
    passport_1.default.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(404).json({
                message: info,
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const expiresIn = process.env.EXPIRE;
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign({ userId: user }, process.env.SECRET_KEY, { expiresIn });
            return res
                .cookie('accessToken', token, { HttpOnly: true })
                .json({ user, token });
        });
    })(req, res);
});
module.exports = router;
