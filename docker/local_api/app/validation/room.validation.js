import { check } from 'express-validator'

export default {
  roomSchema: [
    check('name').not().isEmpty().withMessage('name field is required.'),
    check('buildingId').not().isEmpty().withMessage('buildingId field is required.')
  ]
}

// Path: docker/local_api/app/validation/room.validation.js
