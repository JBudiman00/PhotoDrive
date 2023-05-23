import prisma from '../models/client';
import { Prisma } from '@prisma/client'

async function read(user_id: number){
    const user = await prisma.albums.findMany({
        where: {
            user_id: +user_id
        },
        })
    return user
}

async function create(albumInfo: Prisma.AlbumsCreateInput){
    try {
        await prisma.albums.create({data: albumInfo})
        return {message: "Album successfully created"};
    } catch(e: any) {
        throw e
    }
}

async function update(album_id: number, album_name: string){
    try {
        await prisma.albums.update({
            where: {
                album_id: +album_id
            },
            data: {
                album_name: album_name
            }
        })
        return {message: "Album name successfully updated"};
    } catch(e: any) {
        throw e
    }
}

async function remove(album_id: number, album_name: string){
    try {
        await prisma.albums.delete({
            where: {
                album_id: +album_id
            }
        })
        return {message: "Album deleted successfully deleted"};
    } catch(e: any) {
        throw e
    }
}

module.exports = {
    read,
    create,
    update,
    remove
  };