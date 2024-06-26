import { poolRequest } from "../utils/dbConnect.js";
import sql from "mssql";

export const addAdvanceServices = async (newAdvance) => {
  try {
    const result = await poolRequest()
      .input("Date", sql.DateTime, newAdvance.Date)
      .input("EmployeeID", sql.Int, newAdvance.EmployeeID)
      .input("Amount", sql.Decimal, newAdvance.Amount)
      .query(
        `INSERT INTO AdvanceCash (Date,Amount,EmployeeID) VALUES(@Date,@Amount,@EmployeeID)`
      );
    return result;
  } catch (error) {
    return error.message;
  }
};
export const getAllAdvanceServices = async () => {
  try {
    const result = await poolRequest().query(`SELECT  AdvanceCash.*, Employees.*
        FROM  AdvanceCash
        INNER JOIN Employees ON AdvanceCash.EmployeeID = Employees.ID
        `);
    return result.recordset;
  } catch (error) {
    throw new Error("Could not fetch all Advances: " + error.message);
  }
};

export const deleteAdvanceServices = async () => {
  try {
    const Advance = await poolRequest()
    .query(`DELETE FROM AdvanceCash `);
    return Advance.rowsAffected[0] > 0;
  } catch (error) {
    throw new Error("Failed to delete Advance: " + error.message);
  }
};

export const updateAdvanceServices = async (ID, updatedAdvanceData) => {
  try {
    const Advance = await poolRequest()
      .input("ID", sql.Int, ID)
      .input("Date", sql.VarChar, updatedAdvanceData.Date)
      .input("Amount", sql.Decimal, updatedAdvanceData.Amount)
      .query(` UPDATE AdvanceCash SET 
      
            Date=@Date,
      Amount=@Amount
      WHERE ID = @ID`);
    return Advance.rowsAffected[0] > 0;
  } catch (error) {
    throw new Error("Failed to update Advance: " + error.message);
  }
};
