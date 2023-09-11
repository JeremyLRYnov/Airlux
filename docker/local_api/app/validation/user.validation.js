import { check } from 'express-validator'

export default {
  userSchema: [
    check('email').not().isEmpty().withMessage('Le champ "email" est requis.'),
    check('password').not().isEmpty().withMessage('Le champ "password" est requis.'),
    check('name').not().isEmpty().withMessage('Le champ "name" est requis.')
  ]
}

// Path: docker/local_api/app/validation/user.validation.js
