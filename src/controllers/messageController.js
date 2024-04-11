import { sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError } from '../helper/helper.function.js';
import { deleteMessageServices, getConversationMessagesService, sendMessageService } from '../services/messageServices.js';
import { poolRequest } from "../utils/dbConnect.js";
import { sql } from '../utils/dbConnect.js';

export const sendMessageController = async (req, res) => {
   const { Conversation_id, Sender_id, Content } = req.body;
   try {
      const conversationExists = await checkConversationExistence(Conversation_id);
      if (!conversationExists) {
         return sendNotFound(res, "Conversation not found");
      }
      
      const newMessage = { Conversation_id, Sender_id, Content };
      const rowsAffected = await sendMessageService(newMessage);
      if (rowsAffected > 0) {
         return sendCreated(res, "Message sent successfully");
      } else {
         return sendServerError(res, "Failed to send message");
      }
   } catch (error) {
      return sendServerError(res, "Internal server error");
   }
}

const checkConversationExistence = async (Conversation_id) => {
   try {
      const result = await poolRequest()
         .input("Conversation_id", sql.Int, Conversation_id)
         .query(`
            SELECT COUNT(*) AS count
            FROM Conversations
            WHERE Conversation_Id = @Conversation_id
         `);
      return result.recordset[0].count > 0;
   } catch (error) {
      throw error;
   }
}

export const getMessagesController = async (req,res)=>{
   const { ID } = req.params;
   try {
      const messages = await getConversationMessagesService(ID);
      return res.status(200).send(messages);
   } catch (error) {
      return sendServerError(res, "Internal server error");
   }
}
export const deleteMessage = async (req, res) => {
   const ID = req.params.ID;
   try {
     const success = await deleteMessageServices(ID);
     if (success) {
       sendDeleteSuccess(res, 'message deleted successfully');
     } else {
       sendNotFound(res, 'message not found');
     }
   } catch (error) {
     sendServerError(res, error.message);
   }
 };