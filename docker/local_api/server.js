import Express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import { errorHandler, notFound } from './app/middleware/error.js'
import  mqttClient  from './app/mqtt/mqttHandler.js'

console.log('Mqtt est bien connecté : ' + mqttClient.connected)

/* import routers */
import { router as userRouter } from './app/routes/user.routes.js'
import { router as sensorRouter } from './app/routes/sensor.routes.js'
import { router as roomRouter } from './app/routes/room.routes.js'
import { router as switchRouter } from './app/routes/switch.routes.js'
import { router as buildingRouter } from './app/routes/building.routes.js'
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
app.use('/sensor', sensorRouter)
app.use('/room', roomRouter)
app.use('/switch', switchRouter)
app.use('/building', buildingRouter)

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

// Path: docker/local_api/app/routes/user.routes.js
