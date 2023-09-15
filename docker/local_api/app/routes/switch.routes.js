import express from 'express'

import validator from '../middleware/validator.js'
import { createSwitch, deleteSwitch, getSwitch, getSwitches, updateSwitch, updateSwitchStatusFromApi } from '../controller/switch.controller.js'
import schema from '../validation/switch.validation.js'
import auth from '../middleware/auth.js'

export const router = express.Router()
const { switchSchema } = schema

router.route('/create').post(auth, validator(switchSchema), createSwitch)
router.route('/:id').delete(auth, deleteSwitch)
router.route('/:id').get(auth, getSwitch)
router.route('/').get(auth, getSwitches)
router.route('/:id').patch(auth, updateSwitch)
router.route('/updateStatus/:id').patch(auth, updateSwitchStatusFromApi)

// Path: docker/local_api/app/routes/switch.routes.js
