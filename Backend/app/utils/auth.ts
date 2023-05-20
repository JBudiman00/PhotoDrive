const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../services/user.service');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const secretKey = process.env.SECRET_KEY

passport.use(
    'signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        nameField: 'name',
        session: false,
        passReqToCallback: true
      },
      async (req: any, email: string, password: string, done: any) => {
        try {
          const user = await UserModel.create({email, password, 'name': req.body.name});
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

passport.use(
    'login',
    new LocalStrategy(
        {
        usernameField: 'email',
        passwordField: 'password'
        },
        async (email: string, password: string, done: any) => {
        try {
            const user = await UserModel.verifyEmail(email);
            if (user.length === 0) {
                return done(null, false, { message: 'User not found' });
            }
            const validate = await UserModel.verifyPassword(email, password);
            if (validate.length === 0) {
                return done(null, false, { message: 'Incorrect Password' });
            }

            return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
            return done(error);
        }
        }
    )
);

passport.use(
    new JWTstrategy(
      {
        secretOrKey: secretKey,
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
      },
      async (token: any, done: any) => {
        try {
            return done(null, token.user);
        } catch (error) {
            done(error);
        }
      }
    )
  );