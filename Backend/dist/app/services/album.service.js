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
const db_service_1 = __importDefault(require("./db.service"));
function find(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_service_1.default.query(`SELECT *
        FROM Albums
        WHERE user_id = ?`, [
            user_id
        ]);
        return result;
    });
}
//Need to include insertion into albumphotos also
function create(albumInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield db_service_1.default.query(`INSERT INTO Albums (album_name, user_id)
            VALUES(?, ?);`, [
                albumInfo.album_name, albumInfo.user_id
            ]);
            return { "album_id": result.insertId };
        }
        catch (err) {
            return err;
        }
    });
}
function del(album_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_service_1.default.query(`DELETE FROM Albums 
        WHERE album_id = ?`, [
            album_id
        ]);
        let message = "Album unable to be deleted";
        if (result.affectedRows) {
            message = 'Album successfully deleted';
        }
        return { message };
    });
}
function addPhoto(PAInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_service_1.default.query(`INSERT IGNORE INTO PhotoAlbum(album_id, img_id) 
        VALUES (?, ?)`, [
            PAInfo.album_id, PAInfo.img_id
        ]);
        let message = "Unable to add Photo to album";
        if (result.affectedRows) {
            message = 'Photo successfuly added to album';
        }
        return { message };
    });
}
function delPhoto(PAInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_service_1.default.query(`DELETE FROM PhotoAlbum 
        WHERE album_id = ? AND img_id = ?`, [
            PAInfo.album_id, PAInfo.img_id
        ]);
        let message = "Unable to delete photo from album";
        if (result.affectedRows) {
            message = 'Photo successfuly removed from album';
        }
        return { message };
    });
}
module.exports = {
    create,
    find,
    del,
    addPhoto,
    delPhoto
};
