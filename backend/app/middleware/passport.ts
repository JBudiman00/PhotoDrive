import passport from 'passport';
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;
import { Strategy as LocalStrategy } from 'passport-local';
import prisma from '../models/client';
const bcrypt = require("bcrypt")

export const localStrategy = new LocalStrategy(async (username: string, password: string, done: any) => {
  try {
    const user = await prisma.users.findUnique({
        where: {
            email: username
        },
        select:{
            user_id: true,
            passwordHash: true
        }
    });
    //Handle error if user cannot be found
    if (!user) {
      return done(null, false, 'Unable to find email');
    }

    const isPasswordValid = await bcrypt.compareSync(password, user.passwordHash);

    if (!isPasswordValid) {
      return done(null, false, 'Incorrect password');
    }

    return done(null, user.user_id, 'Logged In Successfully');
  } catch (error) {
    return done(error);
  }
});

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.SECRET_KEY
    },
    //JWTPayload when decoded is the user_id 
    function (jwtPayload: any, cb: any) {
        let user = jwtPayload
        return cb(null, user)
    }
));