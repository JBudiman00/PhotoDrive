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

    let message = "Album unable to be deleted";

    if (result.affectedRows) {
        message = 'Album successfully deleted';
    }

    return {message};
}

interface PhotoAlbum{
    album_id: String,
    img_id: String
}
async function addPhoto(PAInfo: PhotoAlbum){
    const result: any = await db.query(
        `INSERT IGNORE INTO PhotoAlbum(album_id, img_id) 
        VALUES (?, ?)`,
        [
            PAInfo.album_id, PAInfo.img_id
        ]
        );
    let message = "Unable to add Photo to album";

    if (result.affectedRows) {
        message = 'Photo successfuly added to album';
    }

    return {message};
}

async function delPhoto(PAInfo: PhotoAlbum){
    const result: any = await db.query(
        `DELETE FROM PhotoAlbum 
        WHERE album_id = ? AND img_id = ?`,
        [
            PAInfo.album_id, PAInfo.img_id
        ]
        );
    let message = "Unable to delete photo from album";

    if (result.affectedRows) {
        message = 'Photo successfuly removed from album';
    }

    return {message};
}

module.exports = {
    create,
    find,
    del,
    addPhoto,
    delPhoto
}