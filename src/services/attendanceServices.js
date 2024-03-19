import { poolRequest } from "../utils/dbConnect.js";
import sql from 'mssql';


export const addAttendanceServices = async (newAttendance) => {
    try {
      const result= await poolRequest()
        .input('Date', sql.Date, newAttendance.Date)
        .input('TimeIn', sql.DateTime, newAttendance.TimeIn)
        .input('TimeOut', sql.DateTime, newAttendance.TimeOut)
        .query(`INSERT INTO Attendance (Date,TimeIn,TimeOut) VALUES(@Date,@TimeIn,@TimeOut)`
        )
      return result
    } catch (error) {
      return error.message
    }
  }



  export const getAllAttendanceServices = async () => {
    try {
      const result = await poolRequest().query('SELECT * FROM Attendance');
      return result.recordset;
    } catch (error) {
      throw new Error('Could not fetch all Attendances: ' + error.message);
    }
  };


  export const updateAttendanceServices = async (ID, updatedAttendanceData) => {
    try {
      const Attendance = await poolRequest()
        .input('ID', sql.Int,ID)
        .input('Date', sql.Date, updatedAttendanceData.Date)
        .input('TimeIn', sql.DateTime, updatedAttendanceData.TimeIn)
        .input('TimeOut', sql.DateTime, updatedAttendanceData.TimeOut)
    
        .query(`
          UPDATE Attendance SET
          Date = @Date,
          TimeIn = @TimeIn,
          TimeOut=@TimeOut
          WHERE ID = @ID
        `);
  
      return Attendance.rowsAffected[0] > 0;
    } catch (error) {
      throw new Error("Failed to update Attendance: " + error.message);
    }
  };

  export const deleteAttendanceServices = async (ID) => {
    try {
      const Attendance = await poolRequest()
        .input('ID', sql.Int, ID)
        .query(`DELETE FROM Attendance WHERE ID = @ID`);
  
      return Attendance.rowsAffected[0] > 0;
    } catch (error) {
      throw new Error("Failed to delete Attendance: " + error.message);
    }
  };