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
//Hash function to protect code in database
const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
function create(userInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_service_1.default.query(`INSERT INTO Users (name, passwordhash, email) 
        VALUES (?, ?, ?)`, [
            userInfo.name, cyrb53(userInfo.password), userInfo.email
        ]);
        let message = 'Error in creating user';
        if (result.affectedRows) {
            message = 'User created successfully';
        }
        return { message };
    });
}
function verify(userInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_service_1.default.query(`SELECT *
        FROM Users
        WHERE email = ? AND passwordhash = ?`, [
            userInfo.email, cyrb53(userInfo.password)
        ]);
        return result;
    });
}
module.exports = {
    create,
    verify
};
