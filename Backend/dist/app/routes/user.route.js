"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const passport = require('passport');
const controller = require('../controllers/user.controller');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
// POST new users into Users table
router.post('/signup', passport.authenticate('signup', { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: 'Signup successful',
        user: req.user
    });
}));
//Login endpoint
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport.authenticate('login', (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (err || !user) {
                return res.status(401).json({ error: info.message });
            }
            req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return next(error);
                const body = { id: user[0].user_id, email: user[0].email };
                const token = jwt.sign({ user: body }, secretKey);
                return res.json({ token });
            }));
        }
        catch (error) {
            return next(error);
        }
    }))(req, res, next);
}));
//Test secure route
router.get('/test', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token
    });
});
//Add user to album view list
router.post('/addUser', controller.addUser);
//Remove user from album view list
router.delete('/removeUser', controller.removeUser);
module.exports = router;
