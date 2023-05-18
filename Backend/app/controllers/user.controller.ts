import { Request, Response } from "express";
const userServices = require('../services/user.service');

async function create(req: Request, res: Response, next: Function) {
  try {
    res.json(await userServices.create(req.body));
  } catch (err) {
    console.error(`Error while creating users`, err);
    next(err);
  }
}

module.exports = {
  create,
};