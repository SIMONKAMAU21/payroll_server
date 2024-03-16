import dotenv from 'dotenv';
import logger from '../utils/logger.js';
import { getAllUserServices ,getUserByEmailService} from '../services/userService.js';
import {sendNotFound} from '../helper/helper.function.js'

dotenv.config();

export const getAllUserController =async(req,res)=>{
    try {
       const data = await getAllUserServices();
       if (data.lenth ===0) {
        sendNotFound(res,"no employee")
       } else {
        res.status(200).send(data)
       }
    } catch (error) {
        return error.message
    }
};

export const getUserByEmail = async (req, res) => {
//   const { Email } = req.body;


  try {
    const userEmail={
        Email:req.body.Email
      }
      console.log(userEmail)
    const user = await getUserByEmailService(userEmail.Email);
   return res.status(200).json(user);
  } catch (error) {
   return res.status(500).json({ message: error.message });
  }
};
