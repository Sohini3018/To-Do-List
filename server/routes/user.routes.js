import { Router } from "express";
import { validateRegister, validateLogin } from "../middleware/user.middleware.js";
import { validate } from "../validate.js"
import { registerUser, loginUser } from "../controller/user.controller.js";

const router = Router()

router.route("/register").post(validateRegister(), validate, registerUser)
router.route("/login").post(validateLogin(), validate, loginUser)

export default router