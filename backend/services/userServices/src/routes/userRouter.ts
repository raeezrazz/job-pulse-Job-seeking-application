import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router()
const userController = new UserController()

router.post("/register",userController.registerUser)
router.post("/resentOtp",userController.resentOtp)
router.post("/verifyOtp",userController.verifyOtp)



export default router