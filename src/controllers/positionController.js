import { sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, sendSuccess } from "../helper/helper.function.js";
import { addPositionServices, checkPositionExists, deletepositionServices, getAllpositionByIdServices, getAllpositionServices, updatepositionServices } from "../services/positionServices.js";

export const getAllpositionController = async (req, res) => {
    try {
      const data = await getAllpositionServices();
      if (data.lenth === 0) {
        sendNotFound(res, "No positions yet")
      } else {
        res.status(200).send(data)
      }
    } catch (error) {
      return error.message
    }
  };
  
export const getAllpositionByIdController = async (req, res) => {
  const PositionID = req.params.PositionID
  try {
    const data = await getAllpositionByIdServices(PositionID);
    if (data.lenth === 0) {
      sendNotFound(res, "No Employee")
    } else {
      res.status(200).send(data)
    }
  } catch (error) {
    return error.message
  }
};

export const addPosition = async (req, res) => {
    const { Position, Basic_Salary
    } = req.body;
    try {
        const existingPosition = await checkPositionExists(Position);
        if (existingPosition) {
            return sendBadRequest(res, 'position arledy exists');
        }

        const newPosition = {
            Position,
            Basic_Salary
        };
        const response = await addPositionServices(newPosition);
        if (response.rowsAffected > 0) {
            sendCreated(res, 'position created successfully');
        } else {
            sendServerError(res, 'Failed to create position');
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};




export const updateposition = async (req, res) => {
    const ID = req.params.ID;
    const updatedpositionData = req.body;
    try {
      const success = await updatepositionServices(ID, updatedpositionData);
      if (success) {
        sendSuccess(res, 'position updated successfully');
      } else {
        sendNotFound(res, 'position not found');
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


  export const deleteposition = async (req, res) => {
    const ID = req.params.ID;
    try {
      const success = await deletepositionServices(ID);
      if (success) {
        sendDeleteSuccess(res, 'position deleted successfully');
      } else {
        sendNotFound(res, 'position not found');
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };