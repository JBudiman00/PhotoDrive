import prisma from '../models/client';
import { Prisma } from '@prisma/client'

async function read(user_id: number){
    const user = await prisma.photos.findMany({
        where: {
            user_id: +user_id
        },
        select: {
            img_id: true,
            img: true,
            date: true,
            img_name: true,
            user_id: true,
            photoalbums: {
                select:{
                    album_id: true
                }
            }
        }
    })
    return user
}

async function create(albumInfo: Prisma.PhotosCreateInput, filedest: string, user_id: number){
    try {
        await prisma.photos.create({
            data: {
                img_name: albumInfo.img_name,
                user_id: +user_id,
                img: filedest
            }
        })
        return {message: "Photo successfully created"};
    } catch(e: any) {
        throw e
    }
}

async function update(img_id: number, img_name: string, user_id: number){
    try {
        await prisma.photos.update({
            where: {
                img_id: +img_id,
                user_id: +user_id
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

async function remove(img_id: number, user_id: number){
    try {
        //Remove photo foreign key constraints
        await prisma.photoAlbums.deleteMany({
            where: {
                img_id: +img_id
            }
        });

        //Remove photos from photo table
        await prisma.photos.delete({
            where: {
                img_id: +img_id,
                user_id: +user_id
            }
        });
        return {message: "Image successfully deleted"};
    } catch(e: any) {
        throw e
    }
}

async function getPhoto(img_id: number){
    try {
        const filePath = await prisma.photos.findUnique({
            where: {
                img_id: +img_id
            },
            select: {
                img: true
            }
        })
        if(filePath == null){
            throw "Filepath not found";
        }
        return filePath.img;
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

async function verify(album_id: number, img_id: number, user_id: number){
    try {
        const query = await prisma.photos.findMany({
            where: {
                img_id: +img_id,
                user_id: +user_id
                }
        })
        const query1 = await prisma.albums.findMany({
            where: {
                album_id: +album_id,
                user_id: +user_id
                }
        })
        //Check if given user Id has the img Id
        if(query.length == 0 || query1.length == 0){
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
    photoAlbumCreate,
    photoAlbumDelete,
    verify,
    getPhoto
  };