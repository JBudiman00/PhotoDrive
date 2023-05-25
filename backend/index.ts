import session from 'express-session';
const bodyParser = require('body-parser');
import express from 'express'
const port = process.env.PORT || 8000
const userRoutes = require('./app/routes/user.routes') 
const albumRoutes = require('./app/routes/album.routes') 
const photoRoutes = require('./app/routes/photo.routes') 
import { localStrategy } from './app/middleware/passport';
const passport = require('passport');
var cors = require('cors');
const cookieParser = require('cookie-parser');

//Instantiate express
const app = express()
app.use(session({ secret: process.env.SECRET_KEY || "ash", resave: false, saveUninitialized: false }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());

//Authentication initiation
app.use(passport.initialize());
app.use(passport.session());
passport.use(localStrategy);

passport.serializeUser(function(user: any, done: any) {
  done(null, user);
});
passport.deserializeUser(function(user: any, done: any) {
  done(null, user);
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Default response
app.get('/', (req, res) => {
    res.json({'message': 'ok'})
})

//Routes
app.use('/users', userRoutes)
app.use('/albums', passport.authenticate('jwt', {session: false}), albumRoutes)
app.use('/photos', passport.authenticate('jwt', {session: false}), photoRoutes)

const server = app.listen(port, () =>
  console.log(`Server ready at: http://localhost:${port}`)
  ,)