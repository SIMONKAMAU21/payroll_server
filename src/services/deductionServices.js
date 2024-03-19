import { poolRequest } from "../utils/dbConnect.js";
import sql from 'mssql';


export const addDeductionServices = async (newDeduction) => {
    try {
        const result = await poolRequest()
            .input('Description', sql.VarChar, newDeduction.Description)
            .input('Amount', sql.Decimal, newDeduction.Amount)
            .query(`INSERT INTO Deductions (Description,Amount) VALUES(@Description,@Amount)`
            )
        return result
    } catch (error) {
        return error.message
    }
}

export const getAllDeductionServices = async () => {
    try {
        const result = await poolRequest().query('SELECT * FROM Deductions');
        return result.recordset;
    } catch (error) {
        throw new Error('Could not fetch all Deductions: ' + error.message);
    }
};


export const updateDeductionServices = async (DeductionID, updatedDeductionData) => {
    try {
        const Deduction = await poolRequest()
            .input('DeductionID', sql.Int, DeductionID)
            .input('Description', sql.VarChar, updatedDeductionData.Description)
            .input('Amount', sql.Decimal, updatedDeductionData.Amount)
            .query(` UPDATE Deductions SET 
      
      Description=@Description,
      Amount=@Amount
      WHERE DeductionID = @DeductionID`
            )
        return Deduction.rowsAffected[0] > 0;
    } catch (error) {
        throw new Error("Failed to update Deduction: " + error.message);
    }
};

export const deleteDeductionServices = async (DeductionID) => {
    try {
      const Deduction = await poolRequest()
        .input('DeductionID', sql.Int, DeductionID)
        .query(`DELETE FROM Deductions WHERE DeductionID = @DeductionID`);
  
      return Deduction.rowsAffected[0] > 0;
    } catch (error) {
      throw new Error("Failed to delete Deduction: " + error.message);
    }
  };

  export const checkDescriptionExists = async (Description) => {
    try {
      const result = await poolRequest()
        .input('Description', sql.VarChar, Description)
        .query('SELECT * FROM Deductions WHERE Description = @Description');
  
      return result.recordset.length > 0;
    } catch (error) {
      throw new Error('Error checking Description existence: ' + error.message);
    }
  };
  