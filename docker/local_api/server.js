import Express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import { errorHandler, notFound } from './app/middleware/error.js'

/* import routers */
import { router as userRouter } from './app/routes/user.routes.js'
dotenv.config()

const app = new Express()

// Body Parser
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: 'Hello to local API' })
})

/* bring in some routers */
app.use('/user', userRouter)

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
  console.log(`App successfully started on : http://localhost:${PORT}`)
})

process.on('uncaughtException', (error) => {
  console.log(`uncaught exception: ${error.message}`)
  process.exit(1)
})

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error ${err.message}`)
  server.close(() => process.exit(1))
})

app.use(notFound)

app.use(errorHandler)
