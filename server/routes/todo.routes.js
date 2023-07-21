import { Router } from "express"
import { validateTodo } from "../middleware/todo.middleware.js"
import { createTodo, getTodo } from "../controller/todo.controller.js"
import { validate } from "../validate.js"


const router = Router()
router.route("/todoCreate").post(validateTodo(), validate, createTodo)
router.route("/:userId").get(getTodo)

export default router