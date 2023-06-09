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
function create(photoInfo, filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_service_1.default.query(`INSERT INTO Photos (img, img_name, user_id) 
        VALUES (?, ?, ?)`, [
            filename, photoInfo.img_name, photoInfo.user_id
        ]);
        let message = 'Error in creating user';
        if (result.affectedRows) {
            message = 'User created successfully';
        }
        return { message };
    });
}
function find(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_service_1.default.query(`SELECT *
        FROM Photos, PhotoAlbum
        WHERE Photos.user_id = ?
        AND PhotoAlbum.img_id = Photos.img_id`, [
            user_id
        ]);
        return result;
    });
}
function del(img_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_service_1.default.query(`DELETE FROM Photos
        WHERE img_id = ?`, [
            img_id
        ]);
        let message = "Image unable to be deleted";
        if (result.affectedRows) {
            message = 'Image successfully deleted';
        }
        return { message };
    });
}
module.exports = {
    create,
    find,
    del
};
