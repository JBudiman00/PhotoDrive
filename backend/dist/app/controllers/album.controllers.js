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
const albumServices = require('../services/album.services');
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(200).json(yield albumServices.read(req.user.userId));
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
            const album = {
                album_name: req.body.album_name,
                user_id: req.user.userId
            };
            res.status(200).json(yield albumServices.create(album));
        }
        catch (err) {
            //Handle case where user_id doesn't exist
            if (err.code == "P2003") {
                res.status(404).json({ message: "User ID doesn't exist" });
            }
            else {
                //Unknown error
                res.status(500).json({ error: err.message });
                next(err);
            }
        }
    });
}
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield albumServices.update(req.params.album_id, req.body.album_name, req.user.userId);
            res.status(204).json();
        }
        catch (err) {
            //Handle case where album_id doesn't exist
            if (err.code == "P2025") {
                res.status(404).json({ message: "Album ID doesn't exist for this specific User ID" });
            }
            else {
                //Unknown error
                res.status(500).json({ error: err.message });
                next(err);
            }
        }
    });
}
function remove(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(200).json(yield albumServices.remove(req.params.album_id, req.user.userId));
        }
        catch (err) {
            if (err.code == "P2025") {
                res.status(404).json({ message: "Album ID doesn't exist" });
            }
            else {
                //Unknown error
                res.status(500).json({ error: err.message });
                next(err);
            }
        }
    });
}
function albumuserCreate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Verify client request is valid for given album
            const result = yield albumServices.verify(req.params.album_id, req.user.userId);
            if (result === false) {
                throw "User does not own this album";
            }
            //Add user to album viewlist
            res.status(200).json(yield albumServices.albumUserCreate(req.params.album_id, req.params.user_id));
        }
        catch (err) {
            //Handle case where user_id doesn't exist
            if (err.code == "P2003") {
                res.status(404).json({ message: "User ID doesn't exist" });
            }
            else if (err.code == "P2002") {
                res.status(409).json({ message: "Relationship already exists in database" });
            }
            else {
                //Unknown error
                res.status(500).json({ error: err });
                next(err);
            }
        }
    });
}
function albumuserDelete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Verify client request is valid for given album
            const result = yield albumServices.verify(req.params.album_id, req.user.userId);
            if (result === false) {
                throw "User does not own this album";
            }
            res.status(200).json(yield albumServices.albumUserDelete(req.params.album_id, req.params.user_id));
        }
        catch (err) {
            //Handle case where user_id doesn't exist
            if (err.code == "P2003") {
                res.status(404).json({ message: "User ID doesn't exist" });
            }
            else {
                //Unknown error
                res.status(500).json({ error: err.message });
                next(err);
            }
        }
    });
}
module.exports = {
    get,
    create,
    update,
    remove,
    albumuserCreate,
    albumuserDelete
};
