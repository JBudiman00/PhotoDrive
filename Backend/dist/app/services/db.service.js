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
const mysql = require('mysql2/promise');
const dbConfig = require('../configs/db.config');
function query(sql, params) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(dbConfig);
        const connection = yield mysql.createConnection(dbConfig);
        const [results,] = yield connection.execute(sql, params);
        return results;
    });
}
module.exports = {
    query
};
