import express, { Request, Response } from "express";
import dotenv from "dotenv";
const bodyParser = require('body-parser');
const router = require('./app/routes/photodrive.route');
const userRoute = require('./app/routes/user.route');


dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req: Request, res: Response) => {
  res.json({message: 'ok'});
})

app.use('/test', router);
app.use('/user', userRoute);

// app.use('/programming-languages', programmingLanguagesRouter);

// /* Error handler middleware */
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   console.error(err.message, err.stack);
//   res.status(statusCode).json({'message': err.message});
  
//   return;
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});