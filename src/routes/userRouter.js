import { Router } from "express";
import { getAllUserController,getUserByEmail, loginUser } from "../controllers/userController.js";

const userRouter = Router();
userRouter.get("/users",getAllUserController)
userRouter.post('/users',getUserByEmail);
userRouter.post('/users',loginUser);

export default userRouter