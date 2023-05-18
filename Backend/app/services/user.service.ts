import db from './db.service'

interface getUser{
    name: String,
    password: String,
    email: String
}

async function create(userInfo: getUser){
    console.log(userInfo);
    const result: any = await db.query(
        `INSERT INTO Users (name, passwordhash, email) 
        VALUES (?, ?, ?)`, 
        [
            userInfo.name, userInfo.password, userInfo.email
        ]
    );

    let message = 'Error in creating user';

    if (result.affectedRows) {
        message = 'User created successfully';
    }

    return {message};
}

module.exports = {
  create,

}