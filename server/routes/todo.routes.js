import { Router } from "express"
import { validateTodo } from "../middleware/todo.middleware.js"
import { createTodo, getTodo, deleteTodo, updateTodo } from "../controller/todo.controller.js"
import { validate } from "../validate.js"


const router = Router()
router.route("/todoCreate").post(validateTodo(), validate, createTodo)
router.route("/:userId").get(getTodo)
router.route("/:todoId").delete(deleteTodo).patch(updateTodo)

export default router