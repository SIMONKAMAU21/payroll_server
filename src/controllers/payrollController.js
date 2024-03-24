
import { response } from "express";
import { sendBadRequest,  sendNotFound,  sendSuccess } from "../helper/helper.function.js";
import {  addPayrollService, checkEmployeeExists, getAllPayrollsServices, getUserPayrollDetails } from "../services/payrollServices.js";






export const addPayrollController = async (req, res) => {
    try {
        const { EmployeeID } = req.body; 

        const employeeExists = await checkEmployeeExists(EmployeeID);
        if (!employeeExists) {
            return sendNotFound(res, "Employee not found."); 
        }

        const result = await addPayrollService({ EmployeeID });

        if (result.rowsAffected > 0) {
            return sendSuccess(res, "Payroll generated successfully.");
        } else {
            return sendBadRequest(res, "Failed to generate payroll.");
        }
    } catch (error) {
        return sendServerError(res, error.message); 
    }
};


export const getAllPayrollsController = async (req, res) => {
    try {
        const allPayroll = await getAllPayrollsServices(); 
        if (allPayroll.lenth === 0) {
            sendNotFound(res, "no employee")
          } else {
            res.status(200).send(allPayroll)
          }    } catch (error) {
            return error.message
        }
};




export const getUserPayrollDetailsController = async (req, res) => {
    try {
        const { EmployeeID } = req.params;
        const payrollDetails = await getUserPayrollDetails(EmployeeID);
       return sendSuccess(res,payrollDetails)
    } catch (error) {
        console.error('Error fetching user payroll details:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};
