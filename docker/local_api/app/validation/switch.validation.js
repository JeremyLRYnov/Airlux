import { check } from 'express-validator'

export default {
  switchSchema: [
    check('name').not().isEmpty().withMessage('Le champ "name" est requis.'),
    check('roomId').not().isEmpty().withMessage('Le champ "roomId" est requis.'),
    check('status').not().isEmpty().withMessage('Le champ "status" est requis.')
  ]
}

// Path: docker/local_api/app/validation/switch.validation.js
