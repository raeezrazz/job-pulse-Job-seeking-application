import { AdminController } from './../controllers/adminController';
import { Router } from "express";


const adminRouter = Router()

const adminController = new AdminController()

adminRouter.post('/login',adminController.adminLogin)

export default adminRouter