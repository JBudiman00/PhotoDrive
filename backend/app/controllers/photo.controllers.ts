const photoServices = require('../services/photo.services');

async function get(req: any, res: any, next: any) {
  try {
      res.status(200).json(await photoServices.read(req.params.user_id));
  } catch (err: any) {
      console.error(`Error while getting photo info`, err.message);
      next(err);
  }
}

async function create(req: any, res: any, next: any) {
  try {
    res.status(200).json(await photoServices.create(req.body, req.file.destination + req.file.filename));
  } catch (err: any) {
    //Handle case where user_id doesn't exist
    if(err.code == "P2003"){
        res.status(404).json({message: "User ID doesn't exist"})
    } 
    next(err);
  }
}

async function update(req: any, res: any, next: any) {
  try {
    await photoServices.update(req.params.img_id, req.body.img_name);
    res.status(204).json();
  } catch (err: any) {
    //Handle case where album_id doesn't exist
    if(err.code == "P2025"){
        res.status(404).json({message: "Image ID doesn't exist"})
    } else{
        //Unknown error
    res.status(500).json({error: err.message})
    next(err);
    }
  }
}

async function remove(req: any, res: any, next: any) {
  try {
    res.status(200).json(await photoServices.remove(req.params.img_id));
  } catch (err: any) {
    if(err.code == "P2025"){
        res.status(404).json({message: "Image ID doesn't exist"})
    } else{
        //Unknown error
        res.status(500).json({error: err.message})
        next(err);
    }
  }
}

//Relationship endpoint
async function photoalbumCreate(req: any, res: any, next: any) {
  try {
    res.status(201).json(await photoServices.photoAlbumCreate(req.params.img_id, req.params.album_id));
  } catch (err: any) {
    //Handle case where user_id doesn't exist
    if(err.code == "P2002"){
        res.status(404).json({message: "Relationship already established"})
      } else if(err.code == "P2003"){
        res.status(404).json({message: "Unable to find ids required to establish relationship in database"})
      }
    
    next(err);
  }
}

async function photoalbumDelete(req: any, res: any, next: any) {
  try {
    res.status(200).json(await photoServices.photoAlbumDelete(req.params.img_id, req.params.album_id));
  } catch (err: any) {
    //Handle case where user_id doesn't exist
    if(err.code == "P2025"){
        res.status(404).json({message: "Unable to find ids required to remove relationship in database"})
      } else{
        res.status(404).json({message: err})
      }
    next(err);
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  photoalbumCreate,
  photoalbumDelete
};