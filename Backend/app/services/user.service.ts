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
        
    let message = 'Error in creating user';

    if (result.affectedRows) {
        message = 'User created successfully';
    }

    return {message};
}

//Verify user login in database
interface findUser{
    email: String,
    password: String,
}
async function verify(userInfo: findUser){
    const result: any = await db.query(
        `SELECT *
        FROM Users
        WHERE email = ? AND passwordhash = ?`, 
        [
            userInfo.email, cyrb53(userInfo.password)
        ]
    );

    return result;
}

module.exports = {
    create,
    verify
}