import prisma from '../models/client';
import { Prisma } from '@prisma/client'

async function read(email: string){
    const user = await prisma.users.findUnique({
        where: {
          email: email
        },
        include:{
          useralbums: {
            select: {
              album_id: true
            }
          }
        }
      })

    if(user === null){
      throw 1
    }
    return user
}

async function create(userInfo: Prisma.UsersCreateInput){
    try {
        const user = await prisma.users.create({data: userInfo})
        return {message: "User successfully created"};
    } catch(e: any) {
        throw e
    }
}

module.exports = {
    read,
    create,
    // update,
    // remove
  };