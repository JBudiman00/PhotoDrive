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
        const user = yield client_1.default.albums.findMany({
            where: {
                user_id: +user_id
            },
        });
        return user;
    });
}
function create(albumInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.default.albums.create({ data: albumInfo });
            return { message: "Album successfully created" };
        }
        catch (e) {
            throw e;
        }
    });
}
function update(album_id, album_name, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.default.albums.update({
                where: {
                    album_id: +album_id,
                    user_id: +user_id
                },
                data: {
                    album_name: album_name
                }
            });
            return { message: "Album name successfully updated" };
        }
        catch (e) {
            throw e;
        }
    });
}
function remove(album_id, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.default.albums.delete({
                where: {
                    album_id: +album_id,
                    user_id: +user_id
                }
            });
            return { message: "Album successfully deleted" };
        }
        catch (e) {
            throw e;
        }
    });
}
function albumUserCreate(album_id, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.default.userAlbums.create({
                data: {
                    album_id: +album_id,
                    user_id: +user_id
                }
            });
            return { message: "User successfully added to album" };
        }
        catch (e) {
            throw e;
        }
    });
}
function albumUserDelete(album_id, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.default.userAlbums.delete({
                where: {
                    album_id_user_id: {
                        album_id: +album_id,
                        user_id: +user_id
                    }
                }
            });
            return { message: "User successfully deleted from album" };
        }
        catch (e) {
            throw e;
        }
    });
}
function albumUserGet(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Query to find all albums owned by a user
            const albumInfo = yield client_1.default.albums.findMany({
                where: {
                    user_id: +user_id
                },
                select: {
                    album_id: true
                }
            });
            const format = albumInfo.map((item) => { return item.album_id; });
            //Query to find user view permissions for albums found in previosu query
            const userInfo = yield client_1.default.userAlbums.findMany({
                where: {
                    album_id: { in: format }
                },
                select: {
                    album_id: true,
                    user: {
                        select: {
                            user_id: true,
                            name: true,
                            email: true
                        }
                    }
                },
            });
            //Group data and make API more readable
            const groupedData = Object.values(userInfo.reduce((accumulator, item) => {
                const { album_id, user } = item;
                if (!accumulator[album_id]) {
                    accumulator[album_id] = { album_id, user: [] };
                }
                accumulator[album_id].user.push(user);
                return accumulator;
            }, {}));
            return groupedData;
        }
        catch (e) {
            throw e;
        }
    });
}
function photoAlbumShared(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Find all user view shared albums
            const query = yield client_1.default.userAlbums.findMany({
                where: {
                    user_id: user_id
                },
                select: {
                    album: true
                }
            });
            //Group and format data
            const groupedData = yield Promise.all(query.map((i) => __awaiter(this, void 0, void 0, function* () {
                //Get user info for each album
                const miniQuery = yield client_1.default.users.findUnique({
                    where: {
                        user_id: i.album.user_id
                    }
                });
                return {
                    album_id: i.album.album_id,
                    info: {
                        date: i.album.date,
                        album_name: i.album.album_name,
                        name: miniQuery.name,
                        email: miniQuery.email
                    }
                };
            })));
            return groupedData;
        }
        catch (e) {
            throw e;
        }
    });
}
function verify(album_id, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = yield client_1.default.albums.findMany({
                where: {
                    album_id: +album_id,
                    user_id: user_id
                }
            });
            //Check if given user Id has the album Id
            if (query.length == 0) {
                return false;
            }
            return true;
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
    albumUserCreate,
    albumUserDelete,
    verify,
    albumUserGet,
    photoAlbumShared
};
