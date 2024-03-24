import { Router } from "express";
import { addPayrollController, getAllPayrollsController, getUserPayrollDetailsController } from "../controllers/payrollController.js";

const PayrollRouter = Router();
PayrollRouter.get("/Payrolls",getAllPayrollsController)
PayrollRouter.post('/Payroll/register',addPayrollController);
PayrollRouter.get('/payrolls/:EmployeeID', getUserPayrollDetailsController);

// OvertimeRouter.delete('/Payroll/delete/:ID',);
export default PayrollRouter                                                                                     