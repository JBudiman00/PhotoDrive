import express from 'express';
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/user.controller');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY

// POST new users into Users table
router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req: any, res, next) => {
      res.json({
        message: 'Signup successful',
        user: req.user
      });
    }
  );

//Login endpoint
router.post(
    '/login',
    async (req:any, res, next) => {
        passport.authenticate(
        'login',
        async (err: any, user: any, info: any) => {
            try {
                if (err || !user) {
                    return res.status(401).json({ error: info.message });
                }
            req.login(
                user,
                { session: false },
                async (error: Error) => {
                    if (error) return next(error);
                    const body = { id: user[0].user_id, email: user[0].email };
                    //Create access token to expire in 15 minutes
                    const token = jwt.sign({ user: body }, secretKey, {expiresIn:"15m"});
    
                    return res.json({ token });
                }
            );
          } catch (error) {
                return next(error);
          }
        }
      )(req, res, next);
    }
  );

//Test secure route
router.get('/test', passport.authenticate('jwt', { session: false }), (req: any, res, next) => {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token
    })})
//Add user to album view list
router.post('/addUser', controller.addUser)
//Remove user from album view list
router.delete('/removeUser', controller.removeUser)

module.exports = router;