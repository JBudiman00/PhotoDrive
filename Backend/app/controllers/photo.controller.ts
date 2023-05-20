import { Request, Response } from "express";
import fs from 'fs';
const photoServices = require('../services/photo.service');
var _ = require('lodash');

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

interface photoInfo {
  [key: number]: {
    date: String;
    img: String;
    img_name: String;
    user_id: String;
    album_id: Array<number>};
}
async function find(req: Request, res: Response, next: Function) {
  try {
    const result = await photoServices.find(req.params.user_id);
    const groupedData = result.reduce((res: photoInfo, current: any) => {
      const img_id: number = current.img_id;
      // Check if the category already exists in the result object
      if (res[img_id]) {
        res[img_id].album_id.push(current.album_id);
      } else {
        // If the category doesn't exist, create a new array with the current element
        res[img_id] = {
          date: current.date,
          img: current.img,
          img_name: current.img_name,
          user_id: current.user_id,
          album_id: [current.album_id]
        };
      }
      return res;
    }, {});
    res.json(groupedData);
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