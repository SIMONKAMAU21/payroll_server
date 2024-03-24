import { poolRequest } from "../utils/dbConnect.js";
import sql from 'mssql';

export const getAllpositionServices = async () => {
    try {
      const result = await poolRequest().query(`	SELECT Positions.*,Employees.*
			FROM Employees
			Join Positions ON Positions.PositionID= Employees.PositionID`);
      return result.recordset;
    } catch (error) {
      throw new Error('Could not fetch all positions: ' + error.message);
    }
  };



export const addPositionServices = async (newPosition) => {
    try {
      const result= await poolRequest()
        .input('Position', sql.VarChar, newPosition.Position)
        .input('Basic_Salary', sql.Int, newPosition.Basic_Salary)
        .query(`INSERT INTO Positions (Position,Basic_Salary) VALUES(@Position,@Basic_Salary)`
        )
      return result
    } catch (error) {
      return error.message
    }
  }

  export const checkPositionExists = async (Position) => {
    try {
      const result = await poolRequest()
        .input('Position', sql.VarChar, Position)
        .query('SELECT * FROM Positions WHERE Position = @Position');
  
      return result.recordset.length > 0;
    } catch (error) {
      throw new Error('Error checking position existence: ' + error.message);
    }
  };
  


  export const updatepositionServices = async (PositionID, updatedpositionData) => {
    try {
      const position = await poolRequest()
        .input('PositionID', sql.Int,PositionID)
        .input('Position', sql.VarChar, updatedpositionData.Position)
        .input('Basic_Salary', sql.VarChar, updatedpositionData.Basic_Salary)
    
        .query(`
          UPDATE Positions SET
          Position = @Position,
          Basic_Salary = @Basic_Salary
          WHERE PositionID = @PositionID
        `);
  
      return position.rowsAffected[0] > 0;
    } catch (error) {
      throw new Error("Failed to update position: " + error.message);
    }
  };
  export const deletepositionServices = async (PositionID) => {
    try {
      const position = await poolRequest()
        .input('PositionID', sql.Int, PositionID)
        .query(`DELETE FROM Positions WHERE PositionID = @PositionID`);
  
      return position.rowsAffected[0] > 0;
    } catch (error) {
      throw new Error("Failed to delete position: " + error.message);
    }
  };