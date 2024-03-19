import { Router } from "express";
import { addDeduction, deleteDeduction, getAllDeductionController, updateDeduction } from "../controllers/deductionController.js";

const DeductionRouter = Router();
DeductionRouter.get("/Deduction",getAllDeductionController) 
DeductionRouter.put('/Deduction/update/:DeductionID',updateDeduction);
DeductionRouter.post('/Deduction/register',addDeduction);
DeductionRouter.delete('/Deduction/delete/:DeductionID',deleteDeduction);

export default DeductionRouter                                                                                     