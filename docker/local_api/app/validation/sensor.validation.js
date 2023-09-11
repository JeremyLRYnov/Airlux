import { check } from 'express-validator'

export default {
  sensorSchema: [
    check('name').not().isEmpty().withMessage('Le champ \'name\' est requis.'),
    check('roomId').not().isEmpty().withMessage('Le champ \'roomId\' est requis.'),
    check('value').not().isEmpty().withMessage('Le champ \'value\' est requis.'),
    check('unit').not().isEmpty().withMessage('Le champ \'unit\' est requis.')
  ]
}

// Path: docker/local_api/app/validation/sensor.validation.js
