import { poolRequest } from "../utils/dbConnect.js";
import dotenv from 'dotenv';
import sql from 'mssql';
import Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { response } from "express";

dotenv.config()
////getting all users///////////////////////////////
export const getAllUserServices = async () => {
  try {
    const result = await poolRequest().query('SELECT * FROM Employees');
    return result.recordset;
  } catch (error) {
    throw new Error('Could not fetch all users: ' + error.message);
  }
};
////////getting a user by email////////////


export const getUserByEmailService = async (Email, Password) => {
  try {
    const user = await poolRequest()
      .input('Email', sql.VarChar, Email)
      .query("SELECT * FROM Employees WHERE Email=@Email");

    if (user.recordset.length === 0) {
      throw new Error('User not found');
    } else {
      const hashedPasswordFromDB = user.recordset[0].Password; 
      const passwordMatch = await bcrypt.compare(Password, hashedPasswordFromDB);
      if (!passwordMatch) {
        throw new Error('Wrong credentials');
      }
    }

    const token = Jwt.sign(
      {
        Email: user.recordset[0].Email,
        Firstname: user.recordset[0].Firstname,
        Lastname: user.recordset[0].Lastname
      },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    return { user: user.recordset[0], token: `JWT ${token}` };
  } catch (error) {
    console.log(response.message)
    throw new Error('Could not fetch user by email: ' + error.message);
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
      .input('BirthDate', sql.Date, newUser.BirthDate)
      .input('ContactInfo', sql.Int, newUser.ContactInfo)
      .input('Admin', sql.Bit, newUser.Admin)
      .input('Position', sql.VarChar, newUser.Position)
      .input('Schedule', sql.VarChar, newUser.Schedule)
      .input('PhotoURL', sql.VarChar, newUser.PhotoURL)
      .input('Email', sql.VarChar, newUser.Email)
      .input('Password', sql.VarChar, newUser.Password)
      .query(`INSERT INTO Employees(Firstname,Lastname,Address,BirthDate,ContactInfo,Admin,Position,Schedule,PhotoURL,Email,Password)VALUES(@Firstname,@Lastname,@Address,@BirthDate,@ContactInfo,@Admin,@Position,@Schedule,@PhotoURL,@Email,@Password)`
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
      .input('Address', sql.VarChar, updatedUserData.Address || null)
      .input('BirthDate', sql.Date, updatedUserData.BirthDate || null)
      .input('ContactInfo', sql.Int, updatedUserData.ContactInfo || null)
      .input('Admin', sql.Bit, updatedUserData.Admin || false)
      .input('Position', sql.VarChar, updatedUserData.Position || null)
      .input('Schedule', sql.VarChar, updatedUserData.Schedule || null)
      .input('PhotoURL', sql.VarChar, updatedUserData.PhotoURL || null)
      .input('Email', sql.VarChar, updatedUserData.Email)
      .input('Password', sql.VarChar, updatedUserData.Password)
      .query(`
        UPDATE Employees SET
          Firstname = @Firstname,
          Lastname = @Lastname,
          Address = @Address,
          BirthDate = @BirthDate,
          ContactInfo = @ContactInfo,
          Admin = @Admin,
          Position = @Position,
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