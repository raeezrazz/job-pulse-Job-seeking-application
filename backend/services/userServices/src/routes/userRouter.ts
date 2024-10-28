import { logoutUser } from './../../../../../frontend/src/api/userApi';
import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router()
const userController = new UserController()

router.post("/register",userController.registerUser)
router.post('/login',userController.login)

router.post("/resentOtp",userController.resentOtp)
router.post("/verifyOtp",userController.verifyOtp)
router.get('/getUserData',userController.getUserData)

//password
router.patch('/changePassword',userController.changePassword)

//Profile
router.patch('/updateUser',userController.updateUserData)
router.delete('/logout',userController.logoutUser)

router.get('/refresh-token',userController.refreshTokenUpdate)


router.get('/loadUsers',userController.getAllUsers)

export default router