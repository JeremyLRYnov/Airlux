import express from 'express'

import validator from '../middleware/validator.js'
import { signin, signup, updateUser, deleteUser, getUser, getUsers } from '../controller/user.controller.js'
import schema from '../validation/user.validation.js'

export const router = express.Router()
const { userSchema } = schema

router.route('/signin').post(signin)
router.route('/signup').post(validator(userSchema), signup)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)
router.get('/:id', getUser)
router.get('/', getUsers)

// Path: docker/local_api/app/routes/user.routes.js
