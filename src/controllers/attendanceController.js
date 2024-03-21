import { response } from "express";
import { sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, sendSuccess } from "../helper/helper.function.js";
import { addAttendanceServices, deleteAttendanceServices, getAllAttendanceByEmployeeId, getAllAttendanceServices, recordTimeInServices, updateAttendanceServices } from "../services/attendanceServices.js";



export const addAttendance = async (req, res) => {
    const { EmployeeID, Date, TimeIn,TimeOut
    } = req.body;
    try {       
        const newAttendance = {
            Date,
            TimeIn,
            TimeOut,
         
        };

        const insertedId = await addAttendanceServices(EmployeeID,newAttendance);
        if (insertedId) {
            sendCreated(res,{ID:insertedId,message:'clocked in'});
        } else {
            sendServerError(res, 'Failed to create Attendance');
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};


export const getAllAttendanceController = async (req, res) => {
    try {
      const data = await getAllAttendanceServices();
      if (data.lenth === 0) {
        sendNotFound(res, "no employee")
      } else {
        res.status(200).send(data)
      }
    } catch (error) {
      return error.message
    }
  };


  
export const updateAttendance = async (req, res) => {
    const ID = req.params.ID;
    const updatedAttendanceData = req.body;
    try {
      const success = await updateAttendanceServices(ID, updatedAttendanceData);
      if (success) {
        sendSuccess(res, 'Attendance updated successfully');
      } else {
        sendNotFound(res, 'Attendance not found');
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };
  export const deleteAttendance = async (req, res) => {
    const ID = req.params.ID;
    try {
      const success = await deleteAttendanceServices(ID);
      if (success) {
        sendDeleteSuccess(res, 'Attendance deleted successfully');
      } else {
        sendNotFound(res, 'Attendance not found');
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };



 export const getAllAttendanceByEmployeeIdController = async (req, res) => {
    try {
        const { employeeId } = req.params; 
        const attendanceRecords = await getAllAttendanceByEmployeeId(employeeId);
        
        if (attendanceRecords.length === 0) {
            return res.status(404).json({ message: 'No attendance records found for the provided employee ID.' });
        }

        res.status(200).json({ attendanceRecords });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance records: ' + error.message });
    }
};

