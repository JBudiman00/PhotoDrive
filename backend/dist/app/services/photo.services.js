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
const client_1 = __importDefault(require("../models/client"));
function read(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield client_1.default.photos.findMany({
            where: {
                user_id: +user_id
            },
            select: {
                img_id: true,
                img: true,
                date: true,
                img_name: true,
                user_id: true,
                photoalbums: {
                    select: {
                        album_id: true
                    }
                }
            }
        });
        return user;
    });
}
function create(albumInfo, filedest) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.default.photos.create({
                data: {
                    img_name: albumInfo.img_name,
                    user_id: +albumInfo.user,
                    img: filedest
                }
            });
            return { message: "Photo successfully created" };
        }
        catch (e) {
            throw e;
        }
    });
}
function update(img_id, img_name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.default.photos.update({
                where: {
                    img_id: +img_id
                },
                data: {
                    img_name: img_name
                }
            });
            return { message: "Image name successfully updated" };
        }
        catch (e) {
            throw e;
        }
    });
}
function remove(img_id, album_name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.default.photos.delete({
                where: {
                    img_id: +img_id
                }
            });
            return { message: "Image successfully deleted" };
        }
        catch (e) {
            throw e;
        }
    });
}
//Relationship endpoints
function photoAlbumCreate(img_id, album_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.default.photoAlbums.create({
                data: {
                    img_id: +img_id,
                    album_id: +album_id
                }
            });
            return { message: "Photo successfully added to Album" };
        }
        catch (e) {
            throw e;
        }
    });
}
function photoAlbumDelete(img_id, album_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.default.photoAlbums.delete({
                where: {
                    img_id_album_id: {
                        img_id: +img_id,
                        album_id: +album_id
                    }
                }
            });
            return { message: "Photo successfully removed from Album" };
        }
        catch (e) {
            throw e;
        }
    });
}
module.exports = {
    read,
    create,
    update,
    remove,
    photoAlbumCreate,
    photoAlbumDelete
};
