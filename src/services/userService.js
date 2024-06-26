import { poolRequest } from "../utils/dbConnect.js";
import dotenv from 'dotenv';
import sql from 'mssql';


dotenv.config()
export const getAllUserServices = async () => {
  try {
    const result = await poolRequest().query('SELECT * FROM Employees');
    return result.recordset;
  } catch (error) {
    throw new Error('Could not fetch all users: ' + error.message);
  }
};

export const getUserByEmailService = async (Email) => {
  try {
    const user = await poolRequest()
      .input('Email', sql.VarChar, Email)
      .query("SELECT * FROM Employees WHERE Email=@Email");
      
    if (user.recordset.length === 0) {
      throw new Error('User not found');
    }

    return user.recordset[0]; 
  } catch (error) {
    throw new Error('Could not fetch user by email: ' + error.message);
  }
};


export const getUserByIdService = async (ID) => {
    try {
        const user = await poolRequest()
            .input('ID', sql.Int, ID)
            .query(`SELECT  Employees.*,Attendance.*,Schedules.*
            FROM Employees
            JOIN Attendance   ON Attendance.EmployeeID= Employees.ID
            JOIN Schedules ON Schedules.EmployeeID =Employees.ID WHERE Employees.ID=@ID`);
             return user.recordset[1];
    } catch (error) {
        throw new Error('Could not fetch user by ID: ' + error.message);
    }
};


export const checkEmailExists = async (Email) => {
  try {
    const result = await poolRequest()
      .input('Email', sql.VarChar, Email)
      .query('SELECT * FROM Employees WHERE Email = @Email');

    return result.recordset.length > 0;
  } catch (error) {
    throw new Error('Error checking email existence: ' + error.message);
  }
};

////////////adding a user/;////////////
export const addUserServices = async (newUser) => {
  try {
    const user = await poolRequest()
      .input('Firstname', sql.VarChar, newUser.Firstname)
      .input('Lastname', sql.VarChar, newUser.Lastname)
      .input('Address', sql.VarChar, newUser.Address)
      .input('Gender', sql.VarChar, newUser.Gender)
      .input('BirthDate', sql.Date, newUser.BirthDate)
      .input('ContactInfo', sql.Int, newUser.ContactInfo)
      .input('Admin', sql.Bit, newUser.Admin)
      .input('PositionID', sql.Int, newUser.PositionID)
      .input('Schedule', sql.VarChar, newUser.Schedule)
      .input('PhotoURL', sql.VarChar, newUser.PhotoURL)
      .input('Email', sql.VarChar, newUser.Email)
      .input('Password', sql.VarChar, newUser.Password)
      .query(`INSERT INTO Employees(Firstname,Lastname,Address,BirthDate,ContactInfo,Admin,PositionID,Schedule,PhotoURL,Email,Password)VALUES(@Firstname,@Lastname,@Address,@BirthDate,@ContactInfo,@Admin,@PositionID,@Schedule,@PhotoURL,@Email,@Password)`
      )
    return user
  } catch (error) {
    return error.message
  }
}

//////updating a user
export const updateUserServices = async (ID, updatedUserData) => {
  try {
    const user = await poolRequest()
      .input('ID', sql.Int,ID)
      .input('Firstname', sql.VarChar, updatedUserData.Firstname)
      .input('Lastname', sql.VarChar, updatedUserData.Lastname)
      .input('Gender', sql.VarChar, updatedUserData.Gender)
      .input('Address', sql.VarChar, updatedUserData.Address || null)
      .input('BirthDate', sql.Date, updatedUserData.BirthDate || null)
      .input('ContactInfo', sql.Int, updatedUserData.ContactInfo || null)
      .input('Admin', sql.Bit, updatedUserData.Admin || false)
      .input('PositionID', sql.VarChar, updatedUserData.Position || null)
      .input('Schedule', sql.VarChar, updatedUserData.Schedule || null)
      .input('PhotoURL', sql.VarChar, updatedUserData.PhotoURL || null)
      .input('Email', sql.VarChar, updatedUserData.Email)
      .input('Password', sql.VarChar, updatedUserData.Password)
      .query(`
        UPDATE Employees SET
          Firstname = @Firstname,
          Lastname = @Lastname,
          Gender = @Gender,
          Address = @Address,
          BirthDate = @BirthDate,
          ContactInfo = @ContactInfo,
          Admin = @Admin,
          PositionID = @PositionID,
          Schedule = @Schedule,
          PhotoURL = @PhotoURL,
          Email = @Email,
          Password = @Password
        WHERE ID = @ID
      `);

    return user.rowsAffected[0] > 0;
  } catch (error) {
    throw new Error("Failed to update user: " + error.message);
  }
};

export const deleteUserServices = async (ID) => {
  try {
    const user = await poolRequest()
      .input('ID', sql.Int, ID)
      .query(`DELETE FROM Employees WHERE ID = @ID`);

    return user.rowsAffected[0] > 0;
  } catch (error) {
    throw new Error("Failed to delete user: " + error.message);
  }
};