import { Request, Response } from "express";
const userServices = require('../services/user.service');

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
        if (user.length == 0) {
            res.status(401).json({
            message: "Login unsuccessful",
            error: "User not found",
          })
        } else {
            res.status(200).json({
                message: "Login successful",
                user,
            })
        }
      } catch (error: any) {
        res.status(400).json({
            message: "An error occurred",
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