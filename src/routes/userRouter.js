import { Router } from "express";
import { getAllUserController,getUserByEmail, loginUser,addUser, updateUser, deleteUser, getUserByIdController,} from "../controllers/userController.js";
import { auth } from "../middlewares/userAuthentication.js";

const userRouter = Router();
userRouter.get("/users",auth,getAllUserController);
userRouter.get('/users/:Email',auth,getUserByEmail);
userRouter.get('/users/byID/:ID',auth,getUserByIdController);
userRouter.put('/users/update/:ID',auth,updateUser);
userRouter.post('/users/login',loginUser);
userRouter.post('/users/register',auth,addUser);
userRouter.delete('/users/delete/:ID',auth,deleteUser);

export default userRouter                                                                                     