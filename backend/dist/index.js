"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require('body-parser');
const express_1 = __importDefault(require("express"));
const port = process.env.PORT || 8000;
const userRoutes = require('./app/routes/user.routes');
const albumRoutes = require('./app/routes/album.routes');
const app = (0, express_1.default)();
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
app.use('/albums', albumRoutes);
const server = app.listen(port, () => console.log(`Server ready at: http://localhost:${port}`));
