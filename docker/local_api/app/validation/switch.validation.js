import { check } from "express-validator"

export default {
    switchSchema: [
        check("name").not().isEmpty().withMessage("name field is required."),
        check("roomId").not().isEmpty().withMessage("roomId field is required."),
        check("status").not().isEmpty().withMessage("status field is required.")
    ]
}

// Path: docker/local_api/app/validation/switch.validation.js