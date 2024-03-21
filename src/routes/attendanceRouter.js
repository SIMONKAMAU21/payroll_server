import { Router } from "express";
import { addAttendance, getAllAttendanceByEmployeeIdController, getAllAttendanceController,  updateAttendance } from "../controllers/attendanceController.js";

const AttendanceRouter = Router();
AttendanceRouter.get("/Attendance",getAllAttendanceController)
AttendanceRouter.put('/Attendance/update/:ID',updateAttendance);
AttendanceRouter.post('/Attendance/record',addAttendance);
AttendanceRouter.get('/Attendance/:employeeId',getAllAttendanceByEmployeeIdController);

export default AttendanceRouter                                                                                     