import { sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, sendSuccess } from "../helper/helper.function.js";


export const addAdvance = async (req, res) => {
    const { Description, Amount
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
