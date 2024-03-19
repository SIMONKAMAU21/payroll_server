import { Router } from "express";
import { addOvertime, deleteOvertime, getAllOvertimeController, getOvertimeByIdController, updateOvertime } from "../controllers/overtimeController.js";

const OvertimeRouter = Router();
OvertimeRouter.get("/Overtime",getAllOvertimeController) 
OvertimeRouter.get("/Overtime/:ID",getOvertimeByIdController) 
OvertimeRouter.put('/Overtime/update/:ID',updateOvertime);
OvertimeRouter.post('/Overtime/register',addOvertime);
OvertimeRouter.delete('/Overtime/delete/:ID',deleteOvertime);

export default OvertimeRouter                                                                                     