import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty) {
        return next()
    }
    const extractedError = []

    errors.mapped((err) => extractedError.push({ [err.path]: err.message }))
    res.status(422).json({
        status: "failure",
        data: {
            statusCode: 422,
            value: extractedError
        }
    })
}