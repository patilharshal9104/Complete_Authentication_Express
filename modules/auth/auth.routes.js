import { Router } from "express";
import * as controller from "./auth.controller.js"
import RegisterDto from "./dto/register.dto.js"

const router = Router();

router.post("/register", validate(RegisterDto) , controller.register)


// router.post("/addblog", isLoggedIn())
export default router