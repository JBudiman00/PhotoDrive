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
            //console.error(`Error while creating users`, err);
            next(err);
        }
    });
}
function verify(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userServices.verify(req.body);
            if (user.length == 0) {
                res.status(401).json({
                    message: "Login unsuccessful",
                    error: "User not found",
                });
            }
            else {
                res.status(200).json({
                    message: "Login successful",
                    user,
                });
            }
        }
        catch (error) {
            res.status(400).json({
                message: "An error occurred",
                error: error.message,
            });
        }
    });
}
module.exports = {
    create,
    verify
};
