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
const userServices = require('../services/user.services');
const bcrypt = require("bcrypt");
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(200).json(yield userServices.read(req.params.email));
        }
        catch (err) {
            //Couldn't find user with given email address
            if (err === 1) {
                res.status(404).json({ message: "Unable to find user with given email" });
            }
            console.error(`Error while getting user info`, err.message);
            next(err);
        }
    });
}
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pw = yield bcrypt.hashSync(req.body.passwordHash, 8);
            const user = {
                email: req.body.email,
                passwordHash: pw,
                name: req.body.name
            };
            res.status(200).json(yield userServices.create(user));
        }
        catch (err) {
            //Error if user with email already exists
            if (err.code == "P2002") {
                res.status(409).json({ message: "Account already created with this email address" });
            }
            else {
                res.status(500).json({ error: err.message });
                next(err);
            }
        }
    });
}
// async function update(req: any, res: any, next: any) {
//   try {
//     res.json(await userServices.update(req.params.id, req.body));
//   } catch (err: any) {
//     console.error(`Error while updating programming language`, err.message);
//     next(err);
//   }
// }
// async function remove(req: any, res: any, next: any) {
//   try {
//     res.json(await userServices.remove(req.params.id));
//   } catch (err: any) {
//     console.error(`Error while deleting programming language`, err.message);
//     next(err);
//   }
// }
module.exports = {
    get,
    create,
    //   update,
    //   remove
};
