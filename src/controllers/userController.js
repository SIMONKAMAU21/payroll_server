import dotenv from 'dotenv';
import { getAllUserServices, getUserByEmailService, addUserServices, updateUserServices, deleteUserServices, checkEmailExists } from '../services/userService.js';
import { hashPassword, sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError, sendSuccess } from '../helper/helper.function.js'
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

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
    };
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
    };

    const user = await getUserByEmailService(userDetails.Email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(userDetails.Password, user.Password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = Jwt.sign({ Email: user.Email }, process.env.JWT_SECRET, { expiresIn: '12h' });

    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error: error.message });
  }
};




const sendEmail = async (user) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'simogatuma21@gmail.com',
      pass: 'ykck fbzc jghz qjgg'
    }
  });

  const mailOptions ={
    from: 'simogatuma21@gmail.com',
    to: user.Email,
    subject: 'Registration Successful',
    html: `<div style="font-family: Arial, sans-serif; background:linear-gradient(to left,rgba(255,153,0,1),#007bff); max-width: 600px; margin: 0 auto;">
             <p style="font-size: 18px; font-weight: bold;">Dear ${user.Firstname},</p>
             <p style="font-size: 16px;">Thank you for registering. Here are your details:</p>
             <ul style="font-size: 16px;">
               <li><strong>Firstname:</strong> ${user.Firstname}</li>
               <li><strong>Lastname:</strong> ${user.Lastname}</li>
               <li><strong>Email:</strong> ${user.Email}</li>
               <li><strong>Password:</strong> ${user.Password}</li>
             </ul>
             <p style="font-size: 16px;">Regards,<br/>Your Application Team</p>
           </div>`
  };

  await transporter.sendMail(mailOptions);
};



export const addUser = async (req, res) => {
  const { Firstname, Lastname, Address, BirthDate, ContactInfo, Admin, Position, Schedule, PhotoURL, Email, Password } = req.body;
  try {
    const existingUser = await checkEmailExists(Email);
    if (existingUser) {
      return sendBadRequest(res, 'User already exists with this email');
    }

    const newUser = {
      Firstname,
      Lastname,
      Address,
      BirthDate,
      ContactInfo,
      Admin,
      Position,
      Schedule,
      PhotoURL,
      Email,
      Password:await hashPassword(Password)
    };

    const response = await addUserServices(newUser);
    console.log(response)
    if (response.rowsAffected > 0) {
      await sendEmail(newUser);
      sendCreated(res, 'Employee created successfully');
    } else {
      sendServerError(res, 'Failed to create employee');
      console.log(response)
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};



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