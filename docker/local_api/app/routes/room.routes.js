import express from 'express'

import validator from '../middleware/validator.js'
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, getRoomsByBuildingId } from '../controller/room.controller.js'
import schema from '../validation/room.validation.js'
import auth from '../middleware/auth.js'

export const router = express.Router()
const { roomSchema } = schema

router.route('/create').post(auth, validator(roomSchema), createRoom)
router.route('/:id').delete(auth, deleteRoom)
router.route('/:id').get(auth, getRoom)
router.route('/').get(auth, getRooms)
router.route('/:id').patch(auth, updateRoom)
router.route('/buildingId/:id').get(auth, getRoomsByBuildingId)

// Path: docker/local_api/app/routes/room.routes.js
