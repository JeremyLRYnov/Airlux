import express from 'express'

import validator from '../middleware/validator.js'
import { signin, signup, updateUser, deleteUser, getUser, getUsers } from '../controller/user.controller.js'
import schema from '../validation/user.validation.js'
import auth from '../middleware/auth.js'

export const router = express.Router()
const { userSchema } = schema

router.route('/signin').post(signin)
router.route('/signup').post(validator(userSchema), signup)
router.patch('/:id', auth, updateUser)
router.delete('/:id', auth, deleteUser)
router.get('/:id', auth, getUser)
router.get('/', auth, getUsers)

// Path: docker/local_api/app/routes/user.routes.js
