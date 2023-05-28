const userServices = require('../services/user.services');
const bcrypt = require("bcrypt")

async function get(req: any, res: any, next: any) {
  try {
    res.status(200).json(await userServices.read(req.params.email));
  } catch (err: any) {
      //Couldn't find user with given email address
      if(err === 1){
        res.status(404).json({message: "Unable to find user with given email"});
      }
      console.error(`Error while getting user info`, err.message);
      next(err);
  }
}

async function create(req: any, res: any, next: any) {
  try {
    const pw = await bcrypt.hashSync(req.body.passwordHash, 8);
    const user = {
        email: req.body.email,
        passwordHash: pw,
        name: req.body.name
    }
    res.status(200).json(await userServices.create(user));
  } catch (err: any) {
    //Error if user with email already exists
    if(err.code == "P2002"){
      res.status(409).json({message: "Account already created with this email address"})
    } else{
      res.status(500).json({error: err.message});
      next(err);
    }
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

export{}