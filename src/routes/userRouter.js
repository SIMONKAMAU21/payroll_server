import { Router } from "express";
import { getAllUserController,getUserByEmail, loginUser,addUser, updateUser, deleteUser,  } from "../controllers/userController.js";

const userRouter = Router();
userRouter.get("/users",getAllUserController)
userRouter.post('/users',getUserByEmail);
userRouter.put('/users/update/:ID',updateUser);
userRouter.post('/users/login',loginUser);
userRouter.post('/users/register',addUser);
userRouter.delete('/users/delete/:ID',deleteUser);

export default userRouter                                                                                     