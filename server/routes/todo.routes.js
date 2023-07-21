import { Router } from "express"
import { validateTodo } from "../middleware/todo.middleware.js"
import { createTodo } from "../controller/todo.controller.js"
import { validate } from "../validate.js"


const router = Router()
router.route("/todoCreate").post(validateTodo(), validate, createTodo)

export default router