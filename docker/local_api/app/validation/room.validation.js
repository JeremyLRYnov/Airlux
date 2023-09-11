import { check } from 'express-validator'

export default {
  roomSchema: [
    check('name').not().isEmpty().withMessage('Le champ "name" est requis.'),
    check('buildingId').not().isEmpty().withMessage('Le champ "buildingId" est requis.')
  ]
}

// Path: docker/local_api/app/validation/room.validation.js
