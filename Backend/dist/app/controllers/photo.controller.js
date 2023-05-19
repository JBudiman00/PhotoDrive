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
const photoServices = require('../services/photo.service');
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.file) {
                return res.status(400).send('No files were uploaded.');
            }
            res.json(yield photoServices.create(req.body, req.file.destination + req.file.filename));
        }
        catch (err) {
            //Handle error if email already exists in database
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                res.send({ message: "User Doesn't exist" });
            }
            //Catchall error
            if (err instanceof Error) {
                console.log(err);
            }
            next(err);
        }
    });
}
function find(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield photoServices.find(req.params.user_id));
        }
        catch (err) {
            //Catchall error
            if (err instanceof Error) {
                console.log(err);
            }
            next(err);
        }
    });
}
function del(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield photoServices.del(req.params.img_id));
        }
        catch (err) {
            //Catchall error
            if (err instanceof Error) {
                console.log(err);
            }
            next(err);
        }
    });
}
module.exports = {
    create,
    find,
    del
};
