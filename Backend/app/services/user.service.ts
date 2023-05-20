import db from './db.service'

//Hash function to protect code in database
const cyrb53 = (str: String, seed: number = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

//Create user in database
interface postUser{
    name: String,
    password: String,
    email: String
}
async function create(userInfo: postUser){
    const result: any = await db.query(
        `INSERT INTO Users (name, passwordhash, email) 
        VALUES (?, ?, ?)`, 
        [
            userInfo.name, cyrb53(userInfo.password), userInfo.email
        ]
    );

    return result;
}

//Verify user email in database
async function verifyEmail(email: String){
        const result: any = await db.query(
            `SELECT *
            FROM Users
            WHERE email = ?`, 
            [
                email
            ]
        )
    return result;
}

//Verify password in database
async function verifyPassword(email: String, pw: String){
    const result: any = await db.query(
        `SELECT *
        FROM Users
        WHERE email = ? AND passwordhash = ?`, 
        [
            email, cyrb53(pw)
        ]
    )
return result;
}

interface UserAlbum{
    user_id: String,
    album_id: String
}
async function addUser(UAInfo: UserAlbum){
    const result: any = await db.query(
        `INSERT INTO UserAlbum(user_id, album_id)
        VALUES(?,?)`, 
        [
            UAInfo.user_id, UAInfo.album_id
        ]
    );

    let message = 'Could not add user to album view-list';

    if (result.affectedRows) {
        message = 'User succesfully added to album view-list';
    }

    return {message};
}

async function removeUser(UAInfo: UserAlbum){
    const result: any = await db.query(
        `DELETE FROM UserAlbum
        WHERE user_id = ? AND album_id=?`, 
        [
            UAInfo.user_id, UAInfo.album_id
        ]
    );

    let message = 'Could not remove user from album view-list';

    if (result.affectedRows) {
        message = 'User succesfully removed from album view-list';
    }

    return {message};
}

module.exports = {
    create,
    verifyEmail,
    verifyPassword,
    addUser,
    removeUser
}