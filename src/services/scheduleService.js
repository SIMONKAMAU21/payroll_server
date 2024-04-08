import { response } from "express";
import { poolRequest } from "../utils/dbConnect.js";
import sql  from "mssql";




export const getAllSchedulesServices = async () => {
  try {
    const result = await poolRequest().query(`
      SELECT S.*, E.Firstname, E.Lastname, E.PositionID  
      FROM Schedules S
      INNER JOIN Employees E ON E.ID = S.EmployeeID
    `);
    return result.recordset;
  } catch (error) {
    throw new Error('Could not fetch all Schedules: ' + error.message);
  }
};


  export const addScheduleServices = async (EmployeeID, newSchedule) => {
    try {
      const result = await poolRequest()
        .input('EmployeeID', sql.Int, EmployeeID)
        .input('Days', sql.VarChar, newSchedule.Schedules_name)
        .input('StartTime', sql.DateTime, newSchedule.StartTime)
        .input('EndTime', sql.DateTime, newSchedule.EndTime)
        .query(`
          INSERT INTO Schedules (EmployeeID, Days, StartTime, EndTime) 
          VALUES (@EmployeeID, @Days, @StartTime, @EndTime)
        `);
      return result;
    } catch (error) {
      return error.message;
    }
  };
  
  export const checkSchedulesExists = async (EmployeeID) => {
    try {
      const result = await poolRequest()
        .input('EmployeeID', sql.VarChar, EmployeeID)
        .query('SELECT * FROM Schedules WHERE EmployeeID = @EmployeeID');
  
      return result.recordset.length > 0;
    } catch (error) {
      throw new Error('Error checking Schedules existence: ' + error.message);
    }
  };
  export const deleteSchedulesServices = async (ID) => {
    try {
      const Schedules = await poolRequest()
        .input('ID', sql.Int, ID)
        .query(`DELETE FROM Schedules WHERE ID = @ID`);
  
      return Schedules.rowsAffected[0] > 0;
    } catch (error) {
      throw new Error("Failed to delete Schedules: " + error.message);
    }
  };


  export const updateSchedulesServices = async (ID, updatedSchedulesData) => {
    console.log(response)
    try {
      const Schedules = await poolRequest()
        .input('ID', sql.Int,ID)
        .input('Days', sql.VarChar, updatedSchedulesData.Days)
        .input('StartTime', sql.Time, updatedSchedulesData.StartTime)
        .input('EndTime', sql.Time, updatedSchedulesData.EndTime)
        .query(`
          UPDATE Schedules SET
          Days = @Days,
          StartTime = @StartTime,
          EndTime = @EndTime
          WHERE ID = @ID
        `);
  
      return Schedules.rowsAffected[0] > 0;
    } catch (error) {
      throw new Error("Failed to update Schedules: " + error.message);
    }
  };