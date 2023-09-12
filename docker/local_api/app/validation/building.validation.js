import { check } from 'express-validator'

export default {
  buildingSchema: [
    check('name').not().isEmpty().withMessage('Le champ \'name\' est requis.'),
    check('createdBy').not().isEmpty().withMessage('Le champ \'createdBy\' est requis.'),
    check('users').not().isEmpty().withMessage('Le champ \'users\' est requis.')
  ]
}

// Path: docker/local_api/app/validation/building.validation.js
