"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const bodyParser = require('body-parser');
const express_1 = __importDefault(require("express"));
const port = process.env.PORT || 8000;
const userRoutes = require('./app/routes/user.routes');
const albumRoutes = require('./app/routes/album.routes');
const photoRoutes = require('./app/routes/photo.routes');
const passport_1 = require("./app/middleware/passport");
const passport = require('passport');
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({ secret: process.env.SECRET_KEY || "ash", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(passport_1.localStrategy);
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
//Default response
app.get('/', (req, res) => {
    res.json({ 'message': 'ok' });
});
//Routes
app.use('/users', userRoutes);
app.use('/albums', passport.authenticate('jwt', { session: false }), albumRoutes);
app.use('/photos', photoRoutes);
const server = app.listen(port, () => console.log(`Server ready at: http://localhost:${port}`));
