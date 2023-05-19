import { Request, Response } from "express";
import fs from 'fs';
const photoServices = require('../services/photo.service');

async function create(req: any, res: Response, next: Function) {
  try {
    if (!req.file) {
      return res.status(400).send('No files were uploaded.');
    }
    res.json(await photoServices.create(req.body, req.file.destination + req.file.filename));
  } catch (err: any) {
    //Handle error if email already exists in database
    if(err.code === 'ER_NO_REFERENCED_ROW_2'){
      res.send({message: "User Doesn't exist"});
  }
    //Catchall error
    if(err instanceof Error){
        console.log(err);
    }
    next(err);
  }
}

async function find(req: any, res: Response, next: Function) {
  try {
    res.json(await photoServices.find(req.params.user_id));
  } catch (err: any) {
    //Catchall error
    if(err instanceof Error){
        console.log(err);
    }
    next(err);
  }
}

async function del(req: any, res: Response, next: Function) {
  try {
    res.json(await photoServices.del(req.params.img_id));
  } catch (err: any) {
    //Catchall error
    if(err instanceof Error){
        console.log(err);
    }
    next(err);
  }
}

module.exports = {
  create,
  find,
  del
};