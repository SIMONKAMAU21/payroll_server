import dotenv from 'dotenv';
import logger from '../utils/logger.js';
import { getAllUserServices, getUserByEmailService, addUserServices, updateUserServices, deleteUserServices } from '../services/userService.js';
import { sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, sendSuccess } from '../helper/helper.function.js'
import bcrypt from "bcrypt"
import Jwt from 'jsonwebtoken';

dotenv.config();

export const getAllUserController = async (req, res) => {
  try {
    const data = await getAllUserServices();
    if (data.lenth === 0) {
      sendNotFound(res, "no employee")
    } else {
      res.status(200).send(data)
    }
  } catch (error) {
    return error.message
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const userEmail = {
      Email: req.body.Email
    }
    const user = await getUserByEmailService(userEmail.Email);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const userDetails = {
      Email: req.body.Email,
      Password: req.body.Password
    }
    // console.log(userDetails)
    const user = await getUserByEmailService(userDetails.Email);
    // console.log(user)
    if (!user) {
      throw new Error('User not found');
    }
    // const passwordMatch = await bcrypt.compare(userDetails.Password,user.Password);
    // if (!passwordMatch) {
    //   throw new Error('Invalid password');
    // }
    const token = Jwt.sign({ Email: user.Email }, process.env.JWT_SECRET, { expiresIn: '12h' });
    return { user, token };
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};

export const addUser = async (req, res) => {
  const { Firstname, Lastname, Address, BirthDate, ContactInfo, Admin, PositionID, ScheduleID, PhotoURL, Email, Password } = req.body
  try {
    const newUser = {
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Address: req.body.Address,
      BirthDate: req.body.BirthDate,
      ContactInfo: req.body.ContactInfo,
      Admin: req.body.Admin,
      PositionID: req.body.PositionID,
      ScheduleID: req.body.ScheduleID,
      PhotoURL: req.body.PhotoURL,
      Email: req.body.Email,
      Password: req.body.Password

    }
    let response = await addUserServices(newUser)
    if (response.rowsAffected > 0) {
      sendCreated(res, 'employee created succefully')
    }
  } catch (error) {
    sendServerError(res, error.message)
  }
}

export const updateUser = async (req, res) => {
  const ID = req.params.ID;
  const updatedUserData = req.body;
  try {
    const success = await updateUserServices(ID, updatedUserData);
    if (success) {
      sendSuccess(res, 'User updated successfully');
    } else {
      sendNotFound(res, 'User not found');
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const deleteUser = async (req, res) => {
  const ID = req.params.ID;
  try {
    const success = await deleteUserServices(ID);
    if (success) {
      sendDeleteSuccess(res, 'User deleted successfully');
    } else {
      sendNotFound(res, 'User not found');
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};