import { PrismaClient } from '@prisma/client'
const bodyParser = require('body-parser');
import express from 'express'
const port = process.env.PORT || 8000
const userRoutes = require('./app/routes/user.routes') 

//Create prisma and epxress instances
const prisma = new PrismaClient()
const app = express()

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

//ROutes
app.use('/users', userRoutes)

const server = app.listen(port, () =>
  console.log(`Server ready at: http://localhost:${port}`)
  ,)