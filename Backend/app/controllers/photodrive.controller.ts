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

// async function create(req: Request, res: Response, next: Function) {
//   try {
//     res.json(await programmingLanguages.create(req.body));
//   } catch (err) {
//     console.error(`Error while getting programming languages`, err);
//     next(err);
//   }
// }

// async function update(req: Request, res: Response, next: Function) {
//   try {
//     res.json(await programmingLanguages.update(req.params.id, req.body));
//   } catch (err) {
//     console.error(`Error while getting programming languages`, err);
//     next(err);
//   }
// }

// async function remove(req: Request, res: Response, next: Function) {
//   try {
//     res.json(await programmingLanguages.remove(req.params.id));
//   } catch (err) {
//     console.error(`Error while getting programming languages`, err);
//     next(err);
//   }
// }

module.exports = {
  get,
//   create,
//   update,
//   remove
};