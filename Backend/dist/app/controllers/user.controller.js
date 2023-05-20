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
Object.defineProperty(exports, "__esModule", { value: true });
const userServices = require('../services/user.service');
//Functions for token
const { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken, } = require("../utils/token");
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield userServices.create(req.body));
        }
        catch (err) {
            //Handle error if email already exists in database
            if (err.code === 'ER_DUP_ENTRY') {
                res.send({ message: "Account already exists" });
            }
            //Catchall error
            if (err instanceof Error) {
                console.log(err.stack);
            }
            next(err);
        }
    });
}
function verify(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userServices.verify(req.body);
            if (user[0].verification === 1) {
                const accessToken = createAccessToken(user.email);
                const refreshToken = createRefreshToken(user.email);
                //Put refresh token into database
            }
            else {
                res.status(401).json({
                    message: "Login unsuccessful",
                    error: "User not found",
                });
            }
        }
        catch (error) {
            res.status(500).json({
                message: "Error signing in",
                error: error.message,
            });
        }
    });
}
function addUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield userServices.addUser(req.body));
        }
        catch (error) {
            res.status(400).json({
                message: "Could not add user to album view-list",
                error: error.message,
            });
        }
    });
}
function removeUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield userServices.removeUser(req.body));
        }
        catch (error) {
            res.status(400).json({
                message: "Could not remove user from album view-list",
                error: error.message,
            });
        }
    });
}
module.exports = {
    create,
    verify,
    addUser,
    removeUser
};
