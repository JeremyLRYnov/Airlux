import { check } from 'express-validator'

export default {
  buildingSchema: [
    check('name').not().isEmpty().withMessage('name field is required.'),
    check('createdBy').not().isEmpty().withMessage('createdBy field is required.'),
    check('users').not().isEmpty().withMessage('users field is required.')
  ]
}

// Path: docker/local_api/app/validation/building.validation.js
