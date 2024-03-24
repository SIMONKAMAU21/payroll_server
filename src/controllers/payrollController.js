
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
        console.log('response', allPayroll);
        return sendSuccess(res, allPayroll);
    } catch (error) {
        return sendNotFound(res, "No payroll found."); 
    }
};



export const getUserPayrollDetailsController= async(req,res)=>{
    try {
        const userDetails= await getUserPayrollDetails(EmployeeID);
        console.error ('userDetailes', userDetails)
        return sendSuccess(res,userDetails)
    } catch (error) {
        sendNotFound(res,"no user")
    }
}