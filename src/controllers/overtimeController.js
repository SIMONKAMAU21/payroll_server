
import { sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, sendSuccess } from "../helper/helper.function.js";
import { addOvertimeServices, deleteOvertimeServices, getAllOvertimeServices, getOvertimeByIdService, updateOvertimeServices } from "../services/overtimeService.js";

export const addOvertime = async (req, res) => {
    const { Date, Minutes,Hours,Rate
    } = req.body;


    try {  
        // const existingOvertime  =await checkDescriptionExists(Description); 
        // if(existingOvertime){
        //     return sendBadRequest (res,'Overtime alredy exists')
        // }  
        const newOvertime = {
            Date,
            Hours,
            Minutes,
            Rate
        };
        const response = await addOvertimeServices(newOvertime);
        console.log(response)
        if (response.rowsAffected > 0) {
            sendCreated(res, 'Overtime created successfully');
        } else {
            sendServerError(res, 'Failed to create Overtime');
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};
export const getAllOvertimeController = async (req, res) => {
    try {
      const data = await getAllOvertimeServices();
      if (data.lenth === 0) {
        sendNotFound(res, "no Overtime")
      } else {
        res.status(200).send(data)
      }
    } catch (error) {
      return error.message
    }
  };

  export const deleteOvertime = async (req, res) => {
    const ID = req.params.ID;
    try {
      const success = await deleteOvertimeServices(ID);
      if (success) {
        sendDeleteSuccess(res, 'Overtime deleted successfully');
      } else {
        sendNotFound(res, 'Overtime not found');
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };
  export const updateOvertime = async (req, res) => {
    const ID = req.params.ID;
    const updatedOvertimeData = req.body;
    try {
      const success = await updateOvertimeServices(ID, updatedOvertimeData);
      if (success) {
        sendSuccess(res, 'Overtime updated successfully');
      } else {
        sendNotFound(res, 'Overtime not found');
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };

 export const getOvertimeByIdController = async (req, res) => {
    const {ID} = req.params;
    try {
        const overtime = await getOvertimeByIdService(ID);
        if (overtime.length === 0) {
            return res.status(404).json({ message: 'Overtime not found' });
        }
        res.json(overtime);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
