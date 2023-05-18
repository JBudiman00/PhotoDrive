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
const db = require('./db.service');
// async function getMultiple(page = 1){
//   const offset = helper.getOffset(page, config.listPerPage);
//   const rows = await db.query(
//     `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
//     FROM programming_languages LIMIT ?,?`, 
//     [offset, config.listPerPage]
//   );
//   const data = helper.emptyOrRows(rows);
//   const meta = {page};
//   return {
//     data,
//     meta
//   }
// }
function create() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db.query(`SELECT * FROM Users`);
        let message = 'Error in creating programming language';
        if (result.affectedRows) {
            message = 'Programming language created successfully';
        }
        return result;
    });
}
// async function update(id, programmingLanguage){
//   const result = await db.query(
//     `UPDATE programming_languages 
//     SET name=?, released_year=?, githut_rank=?, 
//     pypl_rank=?, tiobe_rank=? 
//     WHERE id=?`, 
//     [
//       programmingLanguage.name, programmingLanguage.released_year,
//       programmingLanguage.githut_rank, programmingLanguage.pypl_rank,
//       programmingLanguage.tiobe_rank, id
//     ]
//   );
//   let message = 'Error in updating programming language';
//   if (result.affectedRows) {
//     message = 'Programming language updated successfully';
//   }
//   return {message};
// }
// async function remove(id){
//   const result = await db.query(
//     `DELETE FROM programming_languages WHERE id=?`, 
//     [id]
//   );
//   let message = 'Error in deleting programming language';
//   if (result.affectedRows) {
//     message = 'Programming language deleted successfully';
//   }
//   return {message};
// }
module.exports = {
    //   getMultiple,
    create,
    //   update,
    //   remove
};
