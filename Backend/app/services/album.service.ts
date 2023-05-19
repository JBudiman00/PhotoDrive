import db from './db.service'

async function find(user_id: String){
    const result: any = await db.query(
        `SELECT *
        FROM Albums
        WHERE user_id = ?`, 
        [
            user_id
        ]
    );

    return result;
}

interface postAlbum {
    album_name: String,
    user_id: String
}
//Need to include insertion into albumphotos also
async function create(albumInfo: postAlbum){
    try{
        const result: any = await db.query(
            `INSERT INTO Albums (album_name, user_id)
            VALUES(?, ?);`,
            [
                albumInfo.album_name, albumInfo.user_id
            ]
            );
        return {"album_id": result.insertId};
    }catch(err) {
        return err;
    }
}
async function del(album_id: String){
    const result: any = await db.query(
        `DELETE FROM Albums 
        WHERE album_id = ?`,
        [
            album_id
        ]
        );
    return {message: "Album successfully deleted"};
}

module.exports = {
    create,
    find,
    del
}