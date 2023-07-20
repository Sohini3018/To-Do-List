import { Router } from "express";
import { validateRegister } from "../middleware/user.middleware.js";
import { validate } from "../validate.js"
import { registerUser } from "../controller/user.controller.js";

const router = Router()

router.route("/register").post(validateRegister(), validate, registerUser)

export default router