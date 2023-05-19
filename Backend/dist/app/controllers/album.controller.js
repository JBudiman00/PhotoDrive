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
const albumServices = require('../services/album.service');
function find(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield albumServices.find(req.params.user_id));
        }
        catch (err) {
            //Catchall error
            if (err instanceof Error) {
                console.log(err.stack);
            }
            //console.error(`Error while creating users`, err);
            next(err);
        }
    });
}
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield albumServices.create(req.body));
        }
        catch (err) {
            //Catchall error
            if (err instanceof Error) {
                console.log(err.stack);
            }
            next(err);
        }
    });
}
function del(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield albumServices.del(req.params.album_id));
        }
        catch (err) {
            //Catchall error
            if (err instanceof Error) {
                console.log(err.stack);
            }
            next(err);
        }
    });
}
function addPhoto(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield albumServices.addPhoto(req.body));
        }
        catch (err) {
            //Catchall error
            if (err instanceof Error) {
                console.log(err.stack);
            }
            next(err);
        }
    });
}
function delPhoto(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield albumServices.delPhoto(req.body));
        }
        catch (err) {
            //Catchall error
            if (err instanceof Error) {
                console.log(err.stack);
            }
            next(err);
        }
    });
}
module.exports = {
    find,
    create,
    del,
    addPhoto,
    delPhoto
};
