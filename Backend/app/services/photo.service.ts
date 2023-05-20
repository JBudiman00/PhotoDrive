import db from './db.service'

//Create user in database
interface postPhoto{
    img: String,
    img_name: String,
    user_id: String
}
async function create(photoInfo: postPhoto, filename: String){
    const result: any = await db.query(
        `INSERT INTO Photos (img, img_name, user_id) 
        VALUES (?, ?, ?)`, 
        [
            filename, photoInfo.img_name, photoInfo.user_id
        ]
    );
        
    let message = 'Error in creating user';

    if (result.affectedRows) {
        message = 'User created successfully';
    }

    return {message};
}
async function find(user_id: String){
    const result: any = await db.query(
        `SELECT *
        FROM Photos, PhotoAlbum
        WHERE Photos.user_id = ?
        AND PhotoAlbum.img_id = Photos.img_id`, 
        [
            user_id
        ]
    );

    return result;
}

async function del(img_id: String){
    const result: any = await db.query(
        `DELETE FROM Photos
        WHERE img_id = ?`, 
        [
            img_id
        ]
    );

    let message = "Image unable to be deleted";

    if (result.affectedRows) {
        message = 'Image successfully deleted';
    }

    return {message};
}

module.exports = {
    create,
    find,
    del
}