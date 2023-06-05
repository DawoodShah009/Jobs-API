require('dotenv').config()
require('express-async-errors')
const connectDB = require('./db/connect')
const express = require('express')
const notFound = require('./middleware/not-found')
const authRouter = require('./route/auth')
const jobRouter = require('./route/jobs')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authorizeUserMiddleware = require('./middleware/authorize')

const app = express()
app.use(express.json())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authorizeUserMiddleware, jobRouter)

// app.get('/', (req, res) => {
//   res.status(200).send('Welcome...')
// })
app.use(notFound)
app.use(errorHandlerMiddleware)
//routes
// /api/v1/auth/register
// /api/v1/auth/login
// /api/v1/jobs
// /api/v1/jobs:id

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is Listening on port ---> ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
