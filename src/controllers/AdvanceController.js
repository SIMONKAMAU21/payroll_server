import {
  sendBadRequest,
  sendCreated,
  sendDeleteSuccess,
  sendNotFound,
  sendServerError,
  sendSuccess,
} from "../helper/helper.function.js";
import {
  addAdvanceServices,
  deleteAdvanceServices,
  getAllAdvanceServices,
  updateAdvanceServices,
} from "../services/advancedService.js";
import cron from "node-cron";

export const addAdvance = async (req, res) => {
  const { Date, Amount, EmployeeID } = req.body;
  try {
    const newAdvance = {
      Date,
      Amount,
      EmployeeID,
    };
    const response = await addAdvanceServices(newAdvance);
    if (response.rowsAffected > 0) {
      sendCreated(res, "Advance created successfully");
    } else {
      sendServerError(res, "Failed to create Advance");
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getAllAdvanceController = async (req, res) => {
  try {
    const data = await getAllAdvanceServices();
    if (data.lenth === 0) {
      sendNotFound(res, "no Advance");
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    return error.message;
  }
};
cron.schedule(
  "0 0 1 * *",
  async () => {
    try {
      await deleteAdvanceServices();
      // console.log("advance deleted every 1 minute")
    } catch (error) {
      console.error(error.message)
    }
  },
  {
    scheduled: true,
    timezone: "Africa/Nairobi",
  }
);
export const deleteAdvance = async (req, res) => {
  try {
      sendDeleteSuccess(res, "Advance deleted successfully");
    }
   catch (error) {
    sendServerError(res, error.message);
  }
};

export const updateAdvance = async (req, res) => {
  const ID = req.params.ID;
  const updatedAdvanceData = req.body;
  try {
    const success = await updateAdvanceServices(ID, updatedAdvanceData);
    if (success) {
      sendSuccess(res, "Advance updated successfully");
    } else {
      sendNotFound(res, "Advance not found");
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};
