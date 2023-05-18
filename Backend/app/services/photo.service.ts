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

module.exports = {
    create
}