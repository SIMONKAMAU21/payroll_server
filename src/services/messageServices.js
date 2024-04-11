
import { poolRequest } from "../utils/dbConnect.js";
import sql from 'mssql';

export const sendMessageService = async (newMessage) => {
   try {
      const message = await poolRequest()
         .input("Conversation_id", sql.Int, newMessage.Conversation_id)
         .input("Sender_id", sql.Int, newMessage.Sender_id)
         .input("Content", sql.Text, newMessage.Content)
         .query(`
            INSERT INTO Messages(Conversation_id, Sender_id, Content)
            VALUES(@Conversation_id, @Sender_id, @Content)
         `);
      return message.rowsAffected; 
   } catch (error) {
      throw error;
   }
}

export const getConversationMessagesService = async (Conversation_id,EmployeeID) => {
   try {
      const result = await poolRequest()
         .input("Conversation_id", sql.Int, Conversation_id)
         .input("EmployeeID", sql.Int, EmployeeID)
         .query(`
            SELECT m.*, u.Firstname,u.Lastname ,u.PhotoURL
            FROM Messages m
            INNER JOIN Employees u ON m.sender_id = u.ID
            WHERE m.Conversation_id = @Conversation_id
         `);
         return result.recordset;
      } catch (error) {
      throw error;
   }
}


export const deleteMessageServices = async (Conversation_id) => {
   try {
     const user = await poolRequest()
     .input('Conversation_id', sql.Int, Conversation_id)
       .query(`DELETE  FROM Messages WHERE Conversation_id=@Conversation_id`);
 
     return user.rowsAffected[0] > 0;
   } catch (error) {
     throw new Error("Failed to delete messages: " + error.message);
   }
 };