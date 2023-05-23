const userServices = require('../services/user.services');
import getBcrypt from '../utils/bcrypt';

async function get(req: any, res: any, next: any) {
  try {
      res.json(await userServices.read(req.params.user_id));
  } catch (err: any) {
      console.error(`Error while getting user info`, err.message);
      next(err);
  }
}

async function create(req: any, res: any, next: any) {
  try {
    const pw = await getBcrypt(req.body.passwordHash);
    const user = {
        email: req.body.email,
        passwordHash: pw,
        name: req.body.name
    }
    res.json(await userServices.create(user));
  } catch (err: any) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
}

// async function update(req: any, res: any, next: any) {
//   try {
//     res.json(await userServices.update(req.params.id, req.body));
//   } catch (err: any) {
//     console.error(`Error while updating programming language`, err.message);
//     next(err);
//   }
// }

// async function remove(req: any, res: any, next: any) {
//   try {
//     res.json(await userServices.remove(req.params.id));
//   } catch (err: any) {
//     console.error(`Error while deleting programming language`, err.message);
//     next(err);
//   }
// }

module.exports = {
  get,
  create,
//   update,
//   remove
};