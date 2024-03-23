import { response } from "express";
import { poolRequest } from "../utils/dbConnect.js";
import sql from 'mssql';


export const addAttendanceServices = async (EmployeeID, newAttendance) => {
  try {
    const result = await poolRequest()
      .input('EmployeeID', sql.Int, EmployeeID)
      .input('Date', sql.Date, newAttendance.Date)
      .input('TimeIn', sql.DateTime, newAttendance.TimeIn)
      .query(`
        INSERT INTO Attendance (EmployeeID, Date, TimeIn) 
        OUTPUT INSERTED.ID
        VALUES (@EmployeeID, @Date, @TimeIn)
      `);
    return result;
  } catch (error) { 
    return error.message;
  }
};



  export const getAllAttendanceServices = async () => {
    try {
      const result = await poolRequest().query(`
        SELECT Attendance.*, Employees.*  
        FROM Attendance 
        INNER JOIN Employees ON Employees.ID = Attendance.EmployeeID
      `);
      return result.recordset
    } catch (error) {
      throw new Error('Could not fetch all Attendances: ' + error.message);
    }
  };



  export const updateAttendanceServices = async (ID, updatedAttendanceData) => {
    try {
      console.log("updated dta is ",updateAttendanceServices);
      const Attendance = await poolRequest()
        .input('ID', sql.Int,ID)
        .input('TimeOut', sql.DateTime, updatedAttendanceData.TimeOut)
    
        .query(`
          UPDATE Attendance SET
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



  export const recordTimeInServices = async (newRecord) => {
    const{EmployeeID, Date, TimeIn}=newRecord;
    try {
        const result = await poolRequest()
            .input('EmployeeID', sql.Int, EmployeeID)
            .input('Date', sql.DateTime, Date)
            .input('TimeIn', sql.DateTime, TimeIn)
            .query(`
                INSERT INTO Attendance (EmployeeID, Date, TimeIn ) 
                VALUES (@EmployeeID, @Date, @TimeIn)`);
                return result.recordset
    } catch (error) {
        throw new Error('Failed to record attendance: ' + error.message);
    }
};

export const getAllAttendanceByEmployeeId = async (employeeId) => {
    try {
        const result = await poolRequest().query(`
            SELECT * 
            FROM Attendance 
            WHERE EmployeeID = ${employeeId}
        `);
        return result.recordset;
    } catch (error) {
        throw new Error('Could not fetch attendance records by employee ID: ' + error.message);
    }
};


