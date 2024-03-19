import { response } from "express";
import { sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, sendSuccess } from "../helper/helper.function.js";
import { addAttendanceServices, deleteAttendanceServices, getAllAttendanceServices, updateAttendanceServices } from "../services/attendanceServices.js";


export const addAttendance = async (req, res) => {
    const { Date, TimeIn,TimeOut
    } = req.body;
    try {       
        const newAttendance = {
            Date,
            TimeIn,
            TimeOut
        };
        const response = await addAttendanceServices(newAttendance);
        console.log(response)
        if (response.rowsAffected > 0) {
            sendCreated(res, 'Attendance created successfully');
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