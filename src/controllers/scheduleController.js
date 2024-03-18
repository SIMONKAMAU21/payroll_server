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
    const { Schedules_name, StartTime,EndTime
    } = req.body;
    try {
        const existingSchedules = await checkSchedulesExists(Schedules_name);
        if (existingSchedules) {
            return sendBadRequest(res, 'Schedules arledy exists');
        }

        const newSchedules = {
            Schedules_name,
            StartTime,
            EndTime,
        };
        const response = await addScheduleServices(newSchedules);
        if (response.rowsAffected > 0) {
            sendSuccess(res, 'Schedules created successfully');
        } else {
            sendBadRequest(res, 'Failed to create Schedules');
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
      } else {
        sendNotFound(res, 'Schedules not found');
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };