import { Router } from "express";
import { addDeduction, deleteDeduction, getAllDeductionController, getDeductionsByEmployeeIdController, updateDeduction } from "../controllers/deductionController.js";
import { auth } from "../middlewares/userAuthentication.js";

const DeductionRouter = Router();
DeductionRouter.get("/Deduction",auth,getAllDeductionController) 
DeductionRouter.put('/Deduction/update/:DeductionID',auth,updateDeduction);
DeductionRouter.get('/Deduction/employee/:ID',auth,getDeductionsByEmployeeIdController);
DeductionRouter.post('/Deduction/register',auth,addDeduction);
DeductionRouter.delete('/Deduction/delete/:DeductionID',auth,deleteDeduction);

export default DeductionRouter                                                                                     