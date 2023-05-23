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
const albumServices = require('../services/album.services');
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(200).json(yield albumServices.read(req.params.user_id));
        }
        catch (err) {
            console.error(`Error while getting album info`, err.message);
            next(err);
        }
    });
}
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(200).json(yield albumServices.create(req.body));
        }
        catch (err) {
            //Handle case where user_id doesn't exist
            if (err.code == "P2003") {
                res.status(404).json({ message: "User ID doesn't exist" });
            }
            //Unknown error
            res.status(500).json({ error: err.message });
            next(err);
        }
    });
}
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield albumServices.update(req.params.album_id, req.body.album_name);
            res.status(200);
        }
        catch (err) {
            //Handle case where album_id doesn't exist
            if (err.code == "P2025") {
                res.status(404).json({ message: "Album ID doesn't exist" });
            }
            //Unknown error
            res.status(500).json({ error: err.message });
            next(err);
        }
    });
}
function remove(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(200).json(yield albumServices.remove(req.params.album_id));
        }
        catch (err) {
            if (err.code == "P2025") {
                res.status(404).json({ message: "Album ID doesn't exist" });
            }
            //Unknown error
            res.status(500).json({ error: err.message });
            next(err);
        }
    });
}
module.exports = {
    get,
    create,
    update,
    remove
};
