import { poolRequest } from "../utils/dbConnect.js";
import dotenv from 'dotenv';
import sql from 'mssql';
import Jwt from "jsonwebtoken";
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

    const token = Jwt.sign(
      {
        Email: user.recordset[0].Email,
        Firstname:user.recordset[0].Firstname,
        Lastname:user.recordset[0].Lastnamename
      },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    return { user: user.recordset[0], token: `JWT ${token}` };
  } catch (error) {
    throw new Error('Could not fetch user by email: ' + error.message);
  }
};
