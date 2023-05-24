const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const jwt = require('jsonwebtoken');
import passport from 'passport';
import ensureAuthenticated from '../utils/ensureAuthenticated';

//Basic CRUD operations
//GET users
router.get('/:user_id', ensureAuthenticated, userController.get)
//POST users
router.post('/', userController.create)
//PUT users

//DELETE users

//Login user
router.post('/login', (req: any, res: any) => {
    passport.authenticate('local', {session: false}, (err: any, user: any, info: any) => {
        if (err || !user) {
            return res.status(400).json({
                message: info,
                user   : user
            });
        }
       req.login(user, {session: false}, (err: any) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user, process.env.SECRET_KEY);
           return res.json({user, token});
        });
    })(req, res);
})
  

module.exports = router;
export{}