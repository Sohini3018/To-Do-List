import { body } from "express-validator";

export const validateTodo = () => {
    return [
        body("todo")
        .trim()
        .notEmpty()
        .withMessage("Todo is required"),

        body("isComplete")
        .notEmpty()
        .withMessage("isComplete option cannot be empty"),

        body("userID")
        .trim()
        .notEmpty()
        .withMessage("userID option cannot be empty"),
    ]
}
