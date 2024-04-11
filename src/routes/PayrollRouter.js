import { Router } from "express";
import { addPayrollController, getAllPayrollsController, getUserPayrollDetailsController } from "../controllers/payrollController.js";
import { auth } from "../middlewares/userAuthentication.js";

const PayrollRouter = Router();
PayrollRouter.get("/Payrolls",auth,getAllPayrollsController)
PayrollRouter.post('/Payroll/register',auth,addPayrollController);
PayrollRouter.get('/payrolls/:EmployeeID',auth, getUserPayrollDetailsController);

// OvertimeRouter.delete('/Payroll/delete/:ID',);
export default PayrollRouter                                                                                     