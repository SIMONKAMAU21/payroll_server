import { response } from "express";
import { poolRequest } from "../utils/dbConnect.js";
import sql  from "mssql";




export const getAllSchedulesServices = async () => {
    try {
      const result = await poolRequest().query('SELECT * FROM Schedules');
      return result.recordset;
    } catch (error) {
      throw new Error('Could not fetch all Schedules: ' + error.message);
    }
  };

export const addScheduleServices = async (newSchedule) => {
    try {
      const result= await poolRequest()
        .input('Schedules_name', sql.VarChar, newSchedule.Schedules_name)
        .input('StartTime', sql.Time, newSchedule.StartTime)
        .input('EndTime', sql.Time, newSchedule.EndTime)
        .query(`INSERT INTO Schedules (Schedules_name,StartTime,EndTime) VALUES(@Schedules_name,@StartTime,@EndTime)`
        )
      return result
    } catch (error) {
      return error.message
    }
  }
  export const checkSchedulesExists = async (Schedules_name) => {
    try {
      const result = await poolRequest()
        .input('Schedules_name', sql.VarChar, Schedules_name)
        .query('SELECT * FROM Schedules WHERE Schedules_name = @Schedules_name');
  
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
        .input('Schedules_name', sql.VarChar, updatedSchedulesData.Schedules_name)
        .input('StartTime', sql.Time, updatedSchedulesData.StartTime)
        .input('EndTime', sql.Time, updatedSchedulesData.EndTime)
        .query(`
          UPDATE Schedules SET
          Schedules_name = @Schedules_name,
          StartTime = @StartTime,
          EndTime = @EndTime
          WHERE ID = @ID
        `);
  
      return Schedules.rowsAffected[0] > 0;
    } catch (error) {
      throw new Error("Failed to update Schedules: " + error.message);
    }
  };