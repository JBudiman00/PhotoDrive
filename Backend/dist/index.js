"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const bodyParser = require('body-parser');
const router = require('./app/routes/photodrive.route');
const userRoute = require('./app/routes/user.route');
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.get('/', (req, res) => {
    res.json({ message: 'ok' });
});
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
    console.log(`Example app listening at http://localhost:${port}`);
});
