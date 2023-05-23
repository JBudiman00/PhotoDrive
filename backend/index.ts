import { PrismaClient } from '@prisma/client'
const bodyParser = require('body-parser');
import express from 'express'
const port = process.env.PORT || 8000
const userRoutes = require('./app/routes/user.routes') 
const albumRoutes = require('./app/routes/album.routes') 

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

//Routes
app.use('/users', userRoutes)
app.use('/albums', albumRoutes)

const server = app.listen(port, () =>
  console.log(`Server ready at: http://localhost:${port}`)
  ,)