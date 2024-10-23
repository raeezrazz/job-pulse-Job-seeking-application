import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router()
const userController = new UserController()

router.post("/register",userController.registerUser)
router.post('/login',userController.login)

router.post("/resentOtp",userController.resentOtp)
router.post("/verifyOtp",userController.verifyOtp)
router.post('/getUserData',userController.getUserData)

//password
router.patch('/changePassword',userController.changePassword)

export default router