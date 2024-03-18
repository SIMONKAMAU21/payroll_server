import { Router } from "express";
import { addSchedules, deleteSchedules, getAllSchedulesController, updateSchedules } from "../controllers/scheduleController.js";
const SchedulesRouter = Router();
SchedulesRouter.get("/Schedules",getAllSchedulesController)
SchedulesRouter.put('/Schedules/update/:ID',updateSchedules);
SchedulesRouter.post('/Schedules/register',addSchedules);
SchedulesRouter.delete('/Schedules/delete/:ID',deleteSchedules);

export default SchedulesRouter                                                                                     