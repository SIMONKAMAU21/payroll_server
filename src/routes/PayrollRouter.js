import { Router } from "express";
import { addPayrollController, getAllPayrollsController, getUserPayrollDetailsController } from "../controllers/payrollController.js";

const PayrollRouter = Router();
PayrollRouter.get("/Payrolls",getAllPayrollsController)
PayrollRouter.get('/Payrolls/:ID',getUserPayrollDetailsController);
PayrollRouter.post('/Payroll/register',addPayrollController);
// OvertimeRouter.delete('/Payroll/delete/:ID',);
export default PayrollRouter                                                                                     