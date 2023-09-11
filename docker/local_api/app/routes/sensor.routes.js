import express from 'express'

import validator from '../middleware/validator.js'
import { createSensor, deleteSensor, getSensor, getSensors, updateSensor } from '../controller/sensor.controller.js'
import schema from '../validation/sensor.validation.js'
import auth from '../middleware/auth.js'

export const router = express.Router()
const { sensorSchema } = schema

router.route('/create').post(auth, validator(sensorSchema), createSensor)
router.route('/:id').get(auth, deleteSensor)
router.route('/:id').get(auth, getSensor)
router.route('/').get(auth, getSensors)
router.route('/:id').patch(auth, updateSensor)

// Path: docker/local_api/app/routes/sensor.routes.js
