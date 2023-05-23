import prisma from '../models/client';
import { Prisma } from '@prisma/client'

async function read(user_id: number){
    const user = await prisma.users.findUnique({
        where: {
          user_id: +user_id
        },
      })
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