import prisma from '../models/client';
import { Prisma } from '@prisma/client'

async function read(user_id: number){
    const user = await prisma.photos.findMany({
        where: {
            user_id: +user_id
        },
        include: {
            photoalbums: true
        }
        })
    return user
}

async function create(albumInfo: Prisma.PhotosCreateInput, filedest: string){
    try {
        await prisma.photos.create({
            data: {
                img_name: albumInfo.img_name,
                user_id: +albumInfo.user,
                img: filedest
            }
        })
        return {message: "Photo successfully created"};
    } catch(e: any) {
        throw e
    }
}

async function update(img_id: number, img_name: string){
    try {
        await prisma.photos.update({
            where: {
                img_id: +img_id
            },
            data: {
                img_name: img_name
            }
        })
        return {message: "Image name successfully updated"};
    } catch(e: any) {
        throw e
    }
}

async function remove(img_id: number, album_name: string){
    try {
        await prisma.photos.delete({
            where: {
                img_id: +img_id
            }
        })
        return {message: "Image successfully deleted"};
    } catch(e: any) {
        throw e
    }
}

//Relationship endpoints
async function photoAlbumCreate(img_id: number, album_id: number){
    try {
        await prisma.photoAlbums.create({
            data: {
                img_id: +img_id,
                album_id: +album_id
            }
        })
        return {message: "Photo successfully added to Album"};
    } catch(e: any) {
        throw e
    }
}

async function photoAlbumDelete(img_id: number, album_id: number){
    try {
        await prisma.photoAlbums.delete({
            where: {
                img_id_album_id:{
                    img_id: +img_id,
                    album_id: +album_id
                }
            }
        })
        return {message: "Photo successfully removed from Album"};
    } catch(e: any) {
        throw e
    }
}

module.exports = {
    read,
    create,
    update,
    remove,
    photoAlbumCreate,
    photoAlbumDelete
  };