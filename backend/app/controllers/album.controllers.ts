const albumServices = require('../services/album.services');

async function get(req: any, res: any, next: any) {
  try {
      res.status(200).json(await albumServices.read(req.params.user_id));
  } catch (err: any) {
      console.error(`Error while getting album info`, err.message);
      next(err);
  }
}

async function create(req: any, res: any, next: any) {
  try {
    res.status(200).json(await albumServices.create(req.body));
  } catch (err: any) {
    //Handle case where user_id doesn't exist
    if(err.code == "P2003"){
        res.status(404).json({message: "User ID doesn't exist"})
    } 
    //Unknown error
    res.status(500).json({error: err.message})
    next(err);
  }
}

async function update(req: any, res: any, next: any) {
  try {
    await albumServices.update(req.params.album_id, req.body.album_name);
    res.status(200)
  } catch (err: any) {
    //Handle case where album_id doesn't exist
    if(err.code == "P2025"){
        res.status(404).json({message: "Album ID doesn't exist"})
    } 
    //Unknown error
    res.status(500).json({error: err.message})
    next(err);
  }
}

async function remove(req: any, res: any, next: any) {
  try {
    res.status(200).json(await albumServices.remove(req.params.album_id));
  } catch (err: any) {
    if(err.code == "P2025"){
        res.status(404).json({message: "Album ID doesn't exist"})
    } 
    //Unknown error
    res.status(500).json({error: err.message})
    next(err);
  }
}

module.exports = {
  get,
  create,
  update,
  remove
};