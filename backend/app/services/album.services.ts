import prisma from '../models/client';
import { Prisma } from '@prisma/client'

async function read(user_id: number){
    const user = await prisma.albums.findMany({
        where: {
            user_id: +user_id
        },
        include: {
            user: true
        }
    })
    //Group and format data
    //To keep form consistent with shared albums, form consists of album_id and info section containing album info and the user owner information
    const groupedData = await Promise.all(user.map(async (i: any) => {
        return{
            album_id: i.album_id,
            info: {
                date: i.date,
                album_name: i.album_name,
                name: i.user.name,
                email: i.user.email
            }
        };
    }));
    return groupedData;
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

async function albumUserGet(user_id: number){
    try {
        //Query to find all albums owned by a user
        const albumInfo = await prisma.albums.findMany({
            where: {
                user_id: +user_id
            },
            select: {
                album_id: true
            }
        })
        const format: Array<number> = albumInfo.map((item) => {return item.album_id})
        
        //Query to find user view permissions for albums found in previosu query
        const userInfo = await prisma.userAlbums.findMany({
            where: {
                album_id: {in: format}
            },
            select: {
                album_id: true,
                user: {
                    select: {
                        user_id: true,
                        name: true,
                        email: true
                    }
                }
            },
        })

        //Group data and make API more readable
        const groupedData = Object.values(
            userInfo.reduce((accumulator: any, item: any) => {
              const { album_id, user } = item;
          
              if (!accumulator[album_id]) {
                accumulator[album_id] = { album_id, user: [] };
              }
          
              accumulator[album_id].user.push(user);
          
              return accumulator;
            }, {})
          );

        return groupedData;
    } catch(e: any) {
        throw e
    }
}

async function photoAlbumShared(user_id: number){
    try {
        //Find all user view shared albums
        const query = await prisma.userAlbums.findMany({
            where: {
                user_id: user_id
            },
            select: {
                album: true
            }
        })
        //Group and format data
        const groupedData = await Promise.all(query.map(async (i: any) => {
            //Get user info for each album
            const miniQuery: any = await prisma.users.findUnique({
                where:{
                    user_id: i.album.user_id
                }
            });
            return{
                album_id: i.album.album_id,
                info: {
                    date: i.album.date,
                    album_name: i.album.album_name,
                    name: miniQuery.name,
                    email: miniQuery.email
                }
            };
        }));
        return groupedData;
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
    verify,
    albumUserGet,
    photoAlbumShared
  };