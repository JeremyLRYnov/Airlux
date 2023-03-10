import { check } from "express-validator";

export default {
  userSchema: [
    check("email").not().isEmpty().withMessage("email field is required."),
    check("password").not().isEmpty().withMessage("password field is required."),
    check("name").not().isEmpty().withMessage("name field is required."),
  ],
};