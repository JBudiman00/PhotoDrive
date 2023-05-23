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
function update(album_id, album_name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.default.albums.update({
                where: {
                    album_id: +album_id
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
function remove(album_id, album_name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client_1.default.albums.delete({
                where: {
                    album_id: +album_id
                }
            });
            return { message: "Album deleted successfully deleted" };
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
    remove
};