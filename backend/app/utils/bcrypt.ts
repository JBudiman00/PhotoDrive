const bcrypt = require("bcrypt")
const saltRounds = 10

export default async function getBcrypt (password: string) {
    return (bcrypt
    .hash(password, saltRounds)
    .then((hash: string) => {
        return hash
    })
    .catch((err: any) => console.error(err.message)))
}