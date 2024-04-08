import { Router } from "express";
import { addAttendance, deleteAttendance, getAllAttendanceByEmployeeIdController, getAllAttendanceController,  updateAttendance } from "../controllers/attendanceController.js";

const AttendanceRouter = Router();
AttendanceRouter.get("/Attendance",getAllAttendanceController)
AttendanceRouter.put('/Attendance/update/:ID',updateAttendance);
AttendanceRouter.post('/Attendance/record',addAttendance);
AttendanceRouter.get('/Attendance/:employeeId',getAllAttendanceByEmployeeIdController);
AttendanceRouter.delete('/Attendance/delete',deleteAttendance);

export default AttendanceRouter                                                                                     