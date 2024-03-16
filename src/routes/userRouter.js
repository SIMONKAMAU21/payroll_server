import { Router } from "express";
import { getAllUserController,getUserByEmail } from "../controllers/userController.js";

const userRouter = Router();
userRouter.get("/users",getAllUserController)
userRouter.post('/users',getUserByEmail);
export default userRouter