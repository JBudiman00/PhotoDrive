import { Request, Response } from "express";
const test = require('../services/photodrive.service');

async function get(req: Request, res: Response, next: Function) {
  try {
    res.json(await test.create());
  } catch (err) {
      console.error(`Error while getting programming languages`, err);
      next(err);
  }
}

module.exports = {
  get,
};