const albumServices = require('../services/album.services');

async function get(req: any, res: any, next: any) {
  try {
      res.status(200).json(await albumServices.read(req.user.userId));
  } catch (err: any) {
      console.error(`Error while getting album info`, err.message);
      next(err);
  }
}

async function create(req: any, res: any, next: any) {
  try {
    const album = {
      album_name: req.body.album_name,
      user_id: req.user.userId
    };
    res.status(200).json(await albumServices.create(album));
  } catch (err: any) {
    //Handle case where user_id doesn't exist
    if(err.code == "P2003"){
        res.status(404).json({message: "User ID doesn't exist"})
    } else{
        //Unknown error
        res.status(500).json({error: err.message})
        next(err);
    }
  }
}

async function update(req: any, res: any, next: any) {
  try {
    await albumServices.update(req.params.album_id, req.body.album_name, req.user.userId);
    res.status(204).json()
  } catch (err: any) {
    //Handle case where album_id doesn't exist
    if(err.code == "P2025"){
        res.status(404).json({message: "Album ID doesn't exist for this specific User ID"})
    } else{
      //Unknown error
      res.status(500).json({error: err.message})
      next(err);
    }
  }
}

async function remove(req: any, res: any, next: any) {
  try {
    res.status(200).json(await albumServices.remove(req.params.album_id, req.user.userId));
  } catch (err: any) {
    if(err.code == "P2025"){
        res.status(404).json({message: "Album ID doesn't exist"})
    } else {
        //Unknown error
        res.status(500).json({error: err.message})
        next(err);
    }
  }
}

async function albumuserCreate(req: any, res: any, next: any) {
  try {
    //Verify client request is valid for given album
    const result = await albumServices.verify(req.params.album_id, req.user.userId)
    if(result === false){
      throw "User does not own this album"
    }
    //Add user to album viewlist
    res.status(200).json(await albumServices.albumUserCreate(req.params.album_id, req.params.user_id));
  } catch (err: any) {
    //Handle case where user_id doesn't exist
    if(err.code == "P2003"){
      res.status(404).json({message: "User ID doesn't exist"})
    } else if(err.code == "P2002"){
      res.status(409).json({message: "Relationship already exists in database"})
    } else{
      //Unknown error
      res.status(500).json({error: err})
      next(err);
    }
  }
}

async function albumuserDelete(req: any, res: any, next: any) {
  try {
    //Verify client request is valid for given album
    const result = await albumServices.verify(req.params.album_id, req.user.userId)
    if(result === false){
      throw "User does not own this album"
    }
    res.status(200).json(await albumServices.albumUserDelete(req.params.album_id, req.params.user_id));
  } catch (err: any) {
    //Handle case where user_id doesn't exist
    if(err.code == "P2003"){
        res.status(404).json({message: "User ID doesn't exist"})
    } else{
        //Unknown error
        res.status(500).json({error: err.message})
        next(err);
    }
  }
}

async function albumuserGet(req: any, res: any, next: any){
  try {
    res.status(200).json(await albumServices.albumUserGet(req.user.userId));
  } catch (err: any) {
    //Handle case where user_id doesn't exist
    res.status(404).json({message: err})
    next(err);
  }
}

async function albumuserShared(req: any, res: any, next: any){
  try {
    res.status(200).json(await albumServices.photoAlbumShared(req.user.userId));
  } catch (err: any) {
    res.status(404).json({message: err});
    next(err);
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  albumuserCreate,
  albumuserDelete,
  albumuserGet,
  albumuserShared
};

export{}