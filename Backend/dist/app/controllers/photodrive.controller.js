"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test = require('../services/photodrive.service');
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield test.create());
        }
        catch (err) {
            console.error(`Error while getting programming languages`, err);
            next(err);
        }
    });
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
