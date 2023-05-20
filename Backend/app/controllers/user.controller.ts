import { Request, Response } from "express";
const userServices = require('../services/user.service');

//Functions for token
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../utils/token");

async function create(req: Request, res: Response, next: Function) {
  try {
    res.json(await userServices.create(req.body));
  } catch (err: any) {
    //Handle error if email already exists in database
    if(err.code === 'ER_DUP_ENTRY'){
        res.send({message: "Account already exists"});
    }
    //Catchall error
    if(err instanceof Error){
        console.log(err.stack);
    }
    next(err);
  }
}

async function verify(req: Request, res: Response, next: Function) {
    try {
        const user = await userServices.verify(req.body)
        if(user[0].verification === 1){
          const accessToken = createAccessToken(user.email);
          const refreshToken = createRefreshToken(user.email);

          //Put refresh token into database
        } else{
          res.status(401).json({
            message: "Login unsuccessful",
            error: "User not found",
        })}
      } catch (error: any) {
        res.status(500).json({
            message: "Error signing in",
            error: error.message,
        })
      }
}

async function addUser(req: Request, res: Response, next: Function) {
  try {
      res.json(await userServices.addUser(req.body));
    } catch (error: any) {
      res.status(400).json({
          message: "Could not add user to album view-list",
          error: error.message,
      })
    }
}

async function removeUser(req: Request, res: Response, next: Function) {
  try {
      res.json(await userServices.removeUser(req.body));
    } catch (error: any) {
      res.status(400).json({
          message: "Could not remove user from album view-list",
          error: error.message,
      })
    }
}

module.exports = {
  create,
  verify,
  addUser,
  removeUser
};