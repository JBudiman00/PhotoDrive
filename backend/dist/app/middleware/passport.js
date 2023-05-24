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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStrategy = void 0;
const passport_1 = __importDefault(require("passport"));
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const passport_local_1 = require("passport-local");
const client_1 = __importDefault(require("../models/client"));
const bcrypt = require("bcrypt");
exports.localStrategy = new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield client_1.default.users.findUnique({
            where: {
                email: username
            },
            select: {
                user_id: true,
                passwordHash: true
            }
        });
        //Handle error if user cannot be found
        if (!user) {
            return done(null, false, 'Unable to find email');
        }
        const isPasswordValid = yield bcrypt.compareSync(password, user.passwordHash);
        if (!isPasswordValid) {
            return done(null, false, 'Incorrect password');
        }
        return done(null, user.user_id, 'Logged In Successfully');
    }
    catch (error) {
        return done(error);
    }
}));
passport_1.default.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
    expiresIn: process.env.EXPIRE
}, 
//JWTPayload when decoded is the user_id 
function (jwtPayload, cb) {
    let user = jwtPayload;
    return cb(null, user);
}));
