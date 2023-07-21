import { body } from "express-validator";

export const validateRegister = () => {
    return [
        body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLowercase()
        .withMessage("Username must be in lowercase")
        .isLength({min:3})
        .withMessage("Username must be at least 3 characters"),

        body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),

        body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({min: 8})
        .withMessage("Password must be at least 8 characters")
    ]
}

export const validateLogin = ()=>{
    return [
        body("email")
        .isEmail()
        .withMessage("Email is invalid"),

        body("password")
        .notEmpty()
        .withMessage("Password is required")
    ]
}