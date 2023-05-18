import db from './db.service'

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

async function create(){
  const result = await db.query(
    `SELECT * FROM Users`
  );
  return result;
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
}