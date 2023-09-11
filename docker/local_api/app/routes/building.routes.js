import express from 'express'

import validator from '../middleware/validator.js'
import { createBuilding, deleteBuilding, getBuilding, getBuildings, updateBuilding } from '../controller/building.controller.js'
import schema from '../validation/building.validation.js'
import auth from '../middleware/auth.js'

export const router = express.Router()
const { buildingSchema } = schema

router.route('/create').post(auth, validator(buildingSchema), createBuilding)
router.route('/:id').delete(auth, deleteBuilding)
router.route('/:id').get(auth, getBuilding)
router.route('/').get(auth, getBuildings)
router.route('/:id').patch(auth, updateBuilding)

// Path: docker/local_api/app/routes/building.routes.js
