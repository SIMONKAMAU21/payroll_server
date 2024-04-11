import { sendBadRequest, sendCreated, sendNotFound, sendServerError } from '../helper/helper.function.js';
import { getAllParticipantDetailes, getParticipantByIdService, sendParticipantService } from '../services/participantService.js';
import { poolRequest, sql } from '../utils/dbConnect.js';


export const sendParticipantController = async (req, res) => {
   const { Conversation_id, EmployeeID } = req.body;
   try {
      const conversationExists = await checkConversationExistence(Conversation_id);
      if (!conversationExists) {
         return sendNotFound(res, "Conversation not found");
      }
      
      const newParticipant = { Conversation_id,EmployeeID  };
      const rowsAffected = await sendParticipantService(newParticipant);
      if (rowsAffected > 0) {
         return sendCreated(res, "Participant sent successfully");
      } else {
         return sendServerError(res, "Failed to send Participant");
      }
   } catch (error) {
      console.log('error', error)
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


export const allParticipantsController= async(req,res)=>{
   try {
      const participants = await getAllParticipantDetailes()
    if (participants.legnth===0) {
      sendNotFound(rs,"no participants")
    } else {
      res.status(200).send(participants)
    }
   } catch (error) {
      throw error
   }
}

export const getParticipantByIdController= async(req,res)=>{
   const ParticipantId=req.params.ID
   try {
     const Participant =await getParticipantByIdService(ParticipantId)
     res.status(200).send(Participant)
   } catch (error) {
     res.error
   }
 }