import { Router } from "express";
import { getAllUserController,getUserByEmail, loginUser,addUser, updateUser, deleteUser, getUserByIdController,} from "../controllers/userController.js";

const userRouter = Router();
userRouter.get("/users",getAllUserController);
userRouter.get('/users/:Email',getUserByEmail);
userRouter.get('/users/byID/:ID',getUserByIdController);
userRouter.put('/users/update/:ID',updateUser);
userRouter.post('/users/login',loginUser);
userRouter.post('/users/register',addUser);
userRouter.delete('/users/delete/:ID',deleteUser);

export default userRouter                                                                                     