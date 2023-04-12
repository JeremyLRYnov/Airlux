import { check } from 'express-validator'

export default {
  sensorSchema: [
    check('name').not().isEmpty().withMessage('name field is required.'),
    check('roomId').not().isEmpty().withMessage('roomId field is required.'),
    check('value').not().isEmpty().withMessage('value field is required.'),
    check('type').not().isEmpty().withMessage('type field is required.')
  ]
}

// Path: docker/local_api/app/validation/sensor.validation.js
