import { Router } from "express";
import { addOvertime, deleteOvertime, getAllOvertimeController, getOvertimeByIdController, updateOvertime } from "../controllers/overtimeController.js";
import { auth } from "../middlewares/userAuthentication.js";

const OvertimeRouter = Router();
OvertimeRouter.get("/Overtime",auth,getAllOvertimeController) 
OvertimeRouter.get("/Overtime/:ID",auth,getOvertimeByIdController) 
OvertimeRouter.put('/Overtime/update/:ID',auth,updateOvertime);
OvertimeRouter.post('/Overtime/register',auth,addOvertime);
OvertimeRouter.delete('/Overtime/delete/:ID',auth,deleteOvertime);

export default OvertimeRouter                                                                                     