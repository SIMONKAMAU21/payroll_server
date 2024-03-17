import dotenv from 'dotenv';
import logger from '../utils/logger.js';
import { getAllUserServices, getUserByEmailService } from '../services/userService.js';
import { sendNotFound } from '../helper/helper.function.js'

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


export const loginUser = async (Email, Password) => {
  try {

    const user = await getUserByEmailService(Email);
    if (!user) {
      throw new Error('User not found');
    }
    const passwordMatch = await bcrypt.compare(Password, user.Password);
    if (!passwordMatch) {
      throw new Error('Invalid password');
    }
    const token = Jwt.sign({ Email: user.Email }, process.env.JWT_SECRET, { expiresIn: '12h' });
    return { user, token };
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};
