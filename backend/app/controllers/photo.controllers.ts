const photoServices = require('../services/photo.services');
const fs = require("fs");

async function get(req: any, res: any, next: any) {
  try {
      res.status(200).json(await photoServices.read(req.user.userId));
  } catch (err: any) {
      console.error(`Error while getting photo info`, err.message);
      next(err);
  }
}

async function create(req: any, res: any, next: any) {
  try {
    res.status(200).json(await photoServices.create(req.body, 'photos/' + req.file.filename, req.user.userId));
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
    await photoServices.update(req.params.img_id, req.body.img_name, req.user.userId);
    res.status(204).json();
  } catch (err: any) {
    //Handle case where album_id doesn't exist
    if(err.code == "P2025"){
        res.status(404).json({message: "Image ID doesn't exist for this user"})
    } else{
        //Unknown error
    res.status(500).json({error: err.message})
    next(err);
    }
  }
}

async function remove(req: any, res: any, next: any) {
  try {
    //Get filename from database
    const filepath = await photoServices.getPhoto(req.body.img_id);
    //Remove file from database
    res.status(200).json(await photoServices.remove(req.body.img_id, req.user.userId));
    //Remove file from physical location
    fs.unlinkSync("C:\\Users\\13145\\Documents\\GitHub\\PhotoDrive\\frontend\\public\\"+filepath);

  } catch (err: any) {
    if(err.code == "P2025"){
        res.status(404).json({message: "Image ID doesn't exist for this user"})
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
    //Verify client request is valid for given album and photo
    const result = await photoServices.verify(req.params.album_id, req.params.img_id, req.user.userId)
    if(result === false){
      throw "User does not own this album or photo"
    }
    res.status(201).json(await photoServices.photoAlbumCreate(req.params.img_id, req.params.album_id));
  } catch (err: any) {
    //Handle case where user_id doesn't exist
    if(err.code == "P2002"){
      res.status(404).json({message: "Relationship already established"})
    } else if(err.code == "P2003"){
      res.status(404).json({message: "Unable to find ids required to establish relationship in database"})
    } else{
      res.status(500).json({error: err})
    }
  
    next(err);
  }
}

async function photoalbumDelete(req: any, res: any, next: any) {
  try {
    //Verify client request is valid for given album and photo
    const result = await photoServices.verify(req.params.album_id, req.params.img_id, req.user.userId)
    if(result === false){
      throw "User does not own this album or photo"
    }
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

export{}