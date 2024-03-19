import { sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, sendSuccess } from "../helper/helper.function.js";
import { addAdvanceServices, deleteAdvanceServices, getAllAdvanceServices, updateAdvanceServices } from "../services/advancedService.js";


export const addAdvance = async (req, res) => {
    const { Date, Amount
    } = req.body;


    try {  
        // const existingAdvance  =await checkDescriptionExists(Description); 
        // if(existingAdvance){
        //     return sendBadRequest (res,'Advance alredy exists')
        // }  
        const newAdvance = {
            Date,
            Amount,
        };
        const response = await addAdvanceServices(newAdvance);
        console.log(response)
        if (response.rowsAffected > 0) {
            sendCreated(res, 'Advance created successfully');
        } else {
            sendServerError(res, 'Failed to create Advance');
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};

export const getAllAdvanceController = async (req, res) => {
    try {
      const data = await getAllAdvanceServices();
      if (data.lenth === 0) {
        sendNotFound(res, "no Advance")
      } else {
        res.status(200).send(data)
      }
    } catch (error) {
      return error.message
    }
  };

  export const deleteAdvance = async (req, res) => {
    const ID = req.params.ID;
    try {
      const success = await deleteAdvanceServices(ID);
      if (success) {
        sendDeleteSuccess(res, 'Advance deleted successfully');
      } else {
        sendNotFound(res, 'Advance not found');
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };

  export const updateAdvance = async (req, res) => {
    const ID = req.params.ID;
    const updatedAdvanceData = req.body;
    try {
      const success = await updateAdvanceServices(ID, updatedAdvanceData);
      if (success) {
        sendSuccess(res, 'Advance updated successfully');
      } else {
        sendNotFound(res, 'Advance not found');
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };