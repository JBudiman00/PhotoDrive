import { Request, Response } from "express";
const albumServices = require('../services/album.service');

async function find(req: Request, res: Response, next: Function) {
  try {
    res.json(await albumServices.find(req.params.user_id));
  } catch (err: any) {
    //Catchall error
    if(err instanceof Error){
        console.log(err.stack);
    }
    //console.error(`Error while creating users`, err);
    next(err);
  }
}

async function create(req: Request, res: Response, next: Function) {
  try {
    res.json(await albumServices.create(req.body));
  } catch (err: any) {
    //Catchall error
    if(err instanceof Error){
        console.log(err.stack);
    }
 
    next(err);
  }
}

async function del(req: Request, res: Response, next: Function) {
  try {
    res.json(await albumServices.del(req.params.album_id));
  } catch (err: any) {
    //Catchall error
    if(err instanceof Error){
        console.log(err.stack);
    }
 
    next(err);
  }
}

async function addPhoto(req: Request, res: Response, next: Function) {
  try {
    res.json(await albumServices.addPhoto(req.body));
  } catch (err: any) {
    //Catchall error
    if(err instanceof Error){
        console.log(err.stack);
    }
 
    next(err);
  }
}

async function delPhoto(req: Request, res: Response, next: Function) {
  try {
    res.json(await albumServices.delPhoto(req.body));
  } catch (err: any) {
    //Catchall error
    if(err instanceof Error){
        console.log(err.stack);
    }
 
    next(err);
  }
}

module.exports = {
  find,
  create,
  del,
  addPhoto,
  delPhoto
};