import { sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, sendSuccess } from "../helper/helper.function.js";
import { addDeductionServices, checkDescriptionExists, deleteDeductionServices, getAllDeductionServices, getDeductionsByEmployeeIdServices, updateDeductionServices } from "../services/deductionServices.js";


export const addDeduction = async (req, res) => {
    const { Description, Amount,EmployeeID
    } = req.body;


    try {  
        const existingDeduction  =await checkDescriptionExists(Description); 
        if(existingDeduction){
            return sendBadRequest (res,'deduction alredy exists')
        }  
        const newDeduction = {
            Description,
            Amount,
            EmployeeID,
        };
        const response = await addDeductionServices(newDeduction);
        if (response.rowsAffected > 0) {
            sendCreated(res, 'Deduction created successfully');
        } else {
            sendServerError(res, 'Failed to create Deduction');
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};


export const getAllDeductionController = async (req, res) => {
    try {
      const data = await getAllDeductionServices();
      if (data.lenth === 0) {
        sendNotFound(res, "no employee")
      } else {
        res.status(200).send(data)
      }
    } catch (error) {
      return error.message
    }
  };

  export const updateDeduction = async (req, res) => {
    const DeductionID = req.params.DeductionID;
    const updatedDeductionData = req.body;
    try {
      const success = await updateDeductionServices(DeductionID, updatedDeductionData);
      if (success) {
        sendSuccess(res, 'Deduction updated successfully');
      } else {
        sendNotFound(res, 'Deduction not found');
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };

  export const deleteDeduction = async (req, res) => {
    const DeductionID = req.params.DeductionID;
    try {
      const success = await deleteDeductionServices(DeductionID);
      if (success) {
        sendDeleteSuccess(res, 'Deduction deleted successfully');
      } else {
        sendNotFound(res, 'Deduction not found');
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


  export const getDeductionsByEmployeeIdController = async (req, res) => {
    try {
        const { ID } = req.params;

        const deductions = await getDeductionsByEmployeeIdServices(parseInt(ID));

        sendSuccess(res, deductions);
    } catch (error) {
        sendBadRequest(res, error.message);
    }
};