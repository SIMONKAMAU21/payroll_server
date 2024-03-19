import { Router } from "express";
import { addAttendance, deleteAttendance, getAllAttendanceController, updateAttendance } from "../controllers/attendanceController.js";

const AttendanceRouter = Router();
AttendanceRouter.get("/Attendance",getAllAttendanceController)
AttendanceRouter.put('/Attendance/update/:ID',updateAttendance);
AttendanceRouter.post('/Attendance/register',addAttendance);
AttendanceRouter.delete('/Attendance/delete/:ID',deleteAttendance);

export default AttendanceRouter                                                                                     