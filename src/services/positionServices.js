import { poolRequest } from "../utils/dbConnect.js";
import sql from 'mssql';

export const getAllpositionServices = async () => {
    try {
      const result = await poolRequest().query('SELECT * FROM Positions');
      return result.recordset;
    } catch (error) {
      throw new Error('Could not fetch all positions: ' + error.message);
    }
  };



export const addPositionServices = async (newPosition) => {
    try {
      const result= await poolRequest()
        .input('Title', sql.VarChar, newPosition.Title)
        .input('Basic_Salary', sql.Int, newPosition.Basic_Salary)
        .query(`INSERT INTO Positions (Title,Basic_Salary) VALUES(@Title,@Basic_Salary)`
        )
      return result
    } catch (error) {
      return error.message
    }
  }

  export const checkPositionExists = async (Title) => {
    try {
      const result = await poolRequest()
        .input('Title', sql.VarChar, Title)
        .query('SELECT * FROM Positions WHERE Title = @Title');
  
      return result.recordset.length > 0;
    } catch (error) {
      throw new Error('Error checking position existence: ' + error.message);
    }
  };
  


  export const updatepositionServices = async (PositionID, updatedpositionData) => {
    try {
      const position = await poolRequest()
        .input('PositionID', sql.Int,PositionID)
        .input('Title', sql.VarChar, updatedpositionData.Title)
        .input('Basic_Salary', sql.VarChar, updatedpositionData.Basic_Salary)
    
        .query(`
          UPDATE Positions SET
          Title = @Title,
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