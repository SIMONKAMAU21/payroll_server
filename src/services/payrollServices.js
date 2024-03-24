import { poolRequest } from "../utils/dbConnect.js";
import sql from 'mssql';




// Function to fetch basic salary by EmployeeID
const fetchBasicSalary = async (employeeID) => {
    try {
        const result = await poolRequest()
            .input("EmployeeID", sql.Int, employeeID)
            .query(
                `SELECT Basic_Salary
                FROM Positions
                WHERE PositionID = (
                    SELECT PositionID
                    FROM Employees
                    WHERE ID = @EmployeeID
                )`
            );

        return result.recordset[0].Basic_Salary;
    } catch (error) {
        throw error;
    }
}

// Function to fetch advance cash for a given EmployeeID
const fetchAdvanceCash = async (employeeID) => {
    try {
        const result = await poolRequest()
            .input("EmployeeID", sql.Int, employeeID)
            .query(
                `SELECT Amount FROM AdvanceCash WHERE EmployeeID = @EmployeeID`
            );

        return result.recordset[0].Amount || 0;
    } catch (error) {
        throw error;
    }
}

// Function to fetch deductions for a given EmployeeID
const fetchDeductions = async (employeeID) => {
    try {
        const result = await poolRequest()
            .input("EmployeeID", sql.Int, employeeID)
            .query(
                `SELECT SUM(Amount) AS TotalDeductions FROM Deductions WHERE EmployeeID = @EmployeeID`
            );

        return result.recordset[0].TotalDeductions || 0;
    } catch (error) {
        throw error;
    }
}

export const addPayrollService = async ({ EmployeeID }) => {
    try {
        const currentDate = new Date().toISOString().slice(0, 10);

        const basicSalary = await fetchBasicSalary(EmployeeID);
        const advanceCash = await fetchAdvanceCash(EmployeeID);
        const deductions = await fetchDeductions(EmployeeID);

        const grossPay = basicSalary;

        const totalDeductions = advanceCash + deductions;

        const netPay = grossPay - totalDeductions;


        const result = await poolRequest()
            .input("EmployeeID", sql.Int, EmployeeID)
            .input("GrossPay", sql.Decimal(10, 2), grossPay)
            .input("DeductionID", sql.Int, null)
            .input("NetPay", sql.Decimal(10, 2), netPay)
            .input("PayrollDate", sql.Date, currentDate)
            .query(
                `INSERT INTO Payroll (EmployeeID, GrossPay, DeductionID, NetPay, PayrollDate)
                VALUES (@EmployeeID, @GrossPay, @DeductionID, @NetPay, @PayrollDate)`
            );

        return result;
    } catch (error) {
        throw error;
    }
}





export const getUserPayrollDetails = async (EmployeeID) => {
    try {
        const result = await poolRequest()
            .input('EmployeeID', EmployeeID)
            .query(`
                SELECT 
                    e.ID AS EmployeeID,
                    e.Firstname,
                    e.Lastname,
                    p.GrossPay,
                    ISNULL(SUM(d.Amount), 0) AS TotalDeductions,
                    ISNULL(SUM(ac.Amount), 0) AS AdvanceCash,
                    p.GrossPay - ISNULL(SUM(d.Amount), 0) - ISNULL(SUM(ac.Amount), 0) AS NetPay
                FROM 
                    Employees e
                LEFT JOIN 
                    Payroll p ON e.ID = p.EmployeeID
                LEFT JOIN 
                    Deductions d ON e.ID = d.EmployeeID
                LEFT JOIN 
                    AdvanceCash ac ON e.ID = ac.EmployeeID
                WHERE 
                    e.ID = @EmployeeID
                GROUP BY 
                    e.ID, e.Firstname, e.Lastname, p.GrossPay;
            `);
        
        return result.recordset[0];
    } catch (error) {
        throw error;
    }
};

export const getAllPayrollsServices = async () => {
    try {
        const result = await poolRequest().query(`
            SELECT *
            FROM Payroll
        `);
        return result.recordset;
    } catch (error) {
        throw error;
    }
};





export const checkEmployeeExists = async (ID) => {
    try {
        const result = await poolRequest()
            .input('EmployeeID', sql.Int, ID)
            .query(`
                SELECT COUNT(*) AS employeeCount
                FROM Employees
                WHERE ID = @EmployeeID
            `);

        return result.recordset[0].employeeCount > 0;
    } catch (error) {
        throw error;
    }
};
