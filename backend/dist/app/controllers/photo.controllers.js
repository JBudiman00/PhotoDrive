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
const photoServices = require('../services/photo.services');
const fs = require("fs");
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(200).json(yield photoServices.read(req.user.userId));
        }
        catch (err) {
            console.error(`Error while getting photo info`, err.message);
            next(err);
        }
    });
}
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(200).json(yield photoServices.create(req.body, 'photos/' + req.file.filename, req.user.userId));
        }
        catch (err) {
            //Handle case where user_id doesn't exist
            if (err.code == "P2003") {
                res.status(404).json({ message: "User ID doesn't exist" });
            }
            next(err);
        }
    });
}
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield photoServices.update(req.params.img_id, req.body.img_name, req.user.userId);
            res.status(204).json();
        }
        catch (err) {
            //Handle case where album_id doesn't exist
            if (err.code == "P2025") {
                res.status(404).json({ message: "Image ID doesn't exist for this user" });
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
            //Get filename from database
            const filepath = yield photoServices.getPhoto(req.body.img_id);
            //Remove file from database
            res.status(200).json(yield photoServices.remove(req.body.img_id, req.user.userId));
            //Remove file from physical location
            fs.unlinkSync("C:\\Users\\13145\\Documents\\GitHub\\PhotoDrive\\frontend\\public\\" + filepath);
        }
        catch (err) {
            if (err.code == "P2025") {
                res.status(404).json({ message: "Image ID doesn't exist for this user" });
            }
            else {
                //Unknown error
                res.status(500).json({ error: err.message });
                next(err);
            }
        }
    });
}
//Relationship endpoint
function photoalbumCreate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Verify client request is valid for given album and photo
            const result = yield photoServices.verify(req.params.album_id, req.params.img_id, req.user.userId);
            if (result === false) {
                throw "User does not own this album or photo";
            }
            res.status(201).json(yield photoServices.photoAlbumCreate(req.params.img_id, req.params.album_id));
        }
        catch (err) {
            //Handle case where user_id doesn't exist
            if (err.code == "P2002") {
                res.status(404).json({ message: "Relationship already established" });
            }
            else if (err.code == "P2003") {
                res.status(404).json({ message: "Unable to find ids required to establish relationship in database" });
            }
            else {
                res.status(500).json({ error: err });
            }
            next(err);
        }
    });
}
function photoalbumDelete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Verify client request is valid for given album and photo
            const result = yield photoServices.verify(req.params.album_id, req.params.img_id, req.user.userId);
            if (result === false) {
                throw "User does not own this album or photo";
            }
            res.status(200).json(yield photoServices.photoAlbumDelete(req.params.img_id, req.params.album_id));
        }
        catch (err) {
            //Handle case where user_id doesn't exist
            if (err.code == "P2025") {
                res.status(404).json({ message: "Unable to find ids required to remove relationship in database" });
            }
            else {
                res.status(404).json({ message: err });
            }
            next(err);
        }
    });
}
module.exports = {
    get,
    create,
    update,
    remove,
    photoalbumCreate,
    photoalbumDelete
};
