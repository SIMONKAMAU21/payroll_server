import { addScheduleServices, checkSchedulesExists,deleteSchedulesServices,getAllSchedulesServices, updateSchedulesServices } from "../services/scheduleService.js";
import { sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, sendSuccess } from "../helper/helper.function.js";
import { response } from "express";

export const getAllSchedulesController = async (req, res) => {
    try {
      const data = await getAllSchedulesServices();
      if (data.lenth === 0) {
        sendNotFound(res, "no shedules")
      } else {
        res.status(200).send(data)
      }
    } catch (error) {
      return error.message
    }
  };

  export const addSchedules = async (req, res) => {
    const { EmployeeID, Days, StartTime, EndTime } = req.body; 
    try {
        const existingSchedules = await checkSchedulesExists(EmployeeID)
      
        if (existingSchedules) {
            return sendNotFound(res, 'Schedule already exists');
        }

        const newSchedules = {
          Days,
            StartTime,
            EndTime,
        };
        const response = await addScheduleServices(EmployeeID, newSchedules);
        if (response.rowsAffected > 0) {
            sendCreated(res, 'Schedules Added successfully');
        } else {
            sendBadRequest(res, 'Failed to add Schedules');
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};

export const deleteSchedules = async (req, res) => {
    const ID = req.params.ID;
    try {
      const success = await deleteSchedulesServices(ID);
      if (success) {
        sendDeleteSuccess(res, 'Schedules deleted successfully');
      } else {
        sendNotFound(res, 'Schedules not found');
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };

  export const updateSchedules = async (req, res) => {
    const ID = req.params.ID;
    const updatedSchedulesData = req.body;
    try {
      const success = await updateSchedulesServices(ID, updatedSchedulesData);
      if (success) {
        sendSuccess(res, 'Schedules updated successfully');
        checkSchedulesExists;
      } else {
        sendNotFound(res, 'Schedules not found');
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };