import { Router } from "express";
import { addAttendance, deleteAttendance, getAllAttendanceByEmployeeIdController, getAllAttendanceController,  updateAttendance } from "../controllers/attendanceController.js";
import { auth } from "../middlewares/userAuthentication.js";

const AttendanceRouter = Router();
AttendanceRouter.get("/Attendance",auth,getAllAttendanceController)
AttendanceRouter.put('/Attendance/update/:ID',auth,updateAttendance);
AttendanceRouter.post('/Attendance/record',auth,addAttendance);
AttendanceRouter.get('/Attendance/:employeeId',auth,getAllAttendanceByEmployeeIdController);
AttendanceRouter.delete('/Attendance/delete',auth,deleteAttendance);

export default AttendanceRouter                                                                                     