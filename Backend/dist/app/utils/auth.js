"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../services/user.service');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const secretKey = process.env.SECRET_KEY;
passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    nameField: 'name',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel.create({ email, password, 'name': req.body.name });
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
})));
passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel.verifyEmail(email);
        if (user.length === 0) {
            return done(null, false, { message: 'User not found' });
        }
        const validate = yield UserModel.verifyPassword(email, password);
        if (validate.length === 0) {
            return done(null, false, { message: 'Incorrect Password' });
        }
        return done(null, user, { message: 'Logged in Successfully' });
    }
    catch (error) {
        return done(error);
    }
})));
passport.use(new JWTstrategy({
    secretOrKey: secretKey,
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return done(null, token.user);
    }
    catch (error) {
        done(error);
    }
})));
