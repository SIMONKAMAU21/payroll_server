import { Router } from "express";
import { addSchedules, deleteSchedules, getAllSchedulesController, updateSchedules } from "../controllers/scheduleController.js";
import { auth } from "../middlewares/userAuthentication.js";
const SchedulesRouter = Router();
SchedulesRouter.get("/Schedules",auth,getAllSchedulesController)
SchedulesRouter.put('/Schedules/update/:ID',auth,updateSchedules);
SchedulesRouter.post('/Schedules/register',auth,addSchedules);
SchedulesRouter.delete('/Schedules/delete/:ID',auth,deleteSchedules);

export default SchedulesRouter                                                                                     