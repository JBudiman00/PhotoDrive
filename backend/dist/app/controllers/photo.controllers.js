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
const photoServices = require('../services/photo.services');
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(200).json(yield photoServices.read(req.params.user_id));
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
            res.status(200).json(yield photoServices.create(req.body, req.file.destination + req.file.filename));
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
            yield photoServices.update(req.params.img_id, req.body.img_name);
            res.status(204).json();
        }
        catch (err) {
            //Handle case where album_id doesn't exist
            if (err.code == "P2025") {
                res.status(404).json({ message: "Image ID doesn't exist" });
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
            res.status(200).json(yield photoServices.remove(req.params.img_id));
        }
        catch (err) {
            if (err.code == "P2025") {
                res.status(404).json({ message: "Image ID doesn't exist" });
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
    remove
};
