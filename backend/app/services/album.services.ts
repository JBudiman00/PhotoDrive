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

async function update(album_id: number, album_name: string, user_id: number){
    try {
        await prisma.albums.update({
            where: {
                album_id: +album_id,
                user_id: +user_id
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

async function remove(album_id: number, user_id: number){
    try {
        await prisma.albums.delete({
            where: {
                album_id: +album_id,
                user_id: +user_id
            }
        })
        return {message: "Album successfully deleted"};
    } catch(e: any) {
        throw e
    }
}

async function albumUserCreate(album_id: number, user_id: number){
    try {
        await prisma.userAlbums.create({
            data: {
                album_id: +album_id,
                user_id: +user_id
            }
        })
        return {message: "User successfully added to album"};
    } catch(e: any) {
        throw e
    }
}

async function albumUserDelete(album_id: number, user_id: number){
    try {
        await prisma.userAlbums.delete({
            where: {
                album_id_user_id: {
                    album_id: +album_id,
                    user_id: +user_id
                }
            }
        })
        return {message: "User successfully deleted from album"};
    } catch(e: any) {
        throw e
    }
}

async function verify(album_id: number, user_id: number){
    try {
        const query = await prisma.albums.findMany({
            where: {
                album_id: +album_id,
                user_id: user_id
                }
        })
        //Check if given user Id has the album Id
        if(query.length == 0){
            return false
        }
        return true
    } catch(e: any) {
        throw e
    }
}

module.exports = {
    read,
    create,
    update,
    remove,
    albumUserCreate,
    albumUserDelete,
    verify
  };