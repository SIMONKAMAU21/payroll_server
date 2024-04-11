import { poolRequest } from "../utils/dbConnect.js";
import sql from 'mssql';


export const sendParticipantService = async (newParticipant) => {
   try {
      const Participant = await poolRequest()
         .input("Conversation_id", sql.Int, newParticipant.Conversation_id)
         .input("EmployeeID", sql.Int, newParticipant.EmployeeID)
         .query(`
            INSERT INTO Participants(Conversation_id, EmployeeID)
            VALUES(@Conversation_id,@EmployeeID)
         `);
      return Participant.rowsAffected; 
   } catch (error) {
      throw error;
   }
}

export const getAllParticipantDetailes=async()=>{
   try {
      const result= await poolRequest().query(`SELECT Participants.*,Employees.*,Conversations.*
      FROM Participants
      INNER JOIN
      Employees ON Participants.EmployeeID=Employees.ID
      INNER JOIN
      Conversations ON Participants.Conversation_id=Conversations.Conversation_id;
      `)
      return result.recordset
   } catch (error) {
      throw error
   }
}

export const getParticipantByIdService = async (ID) => {
   try {
       const Participant = await poolRequest()
           .input('ID', sql.Int, ID)
           .query(`SELECT Participants.*,Employees.*,Conversations.*
           FROM Participants
           INNER JOIN
           Employees ON Participants.EmployeeID=Employees.ID
           INNER JOIN
           Conversations ON Participants.Conversation_id=Conversations.Conversation_id WHERE EmployeeID=@ID
           `);
            return Participant.recordset;
   } catch (error) {
       throw new Error('Could not fetch Participant by ID: ' + error.message);
   }
};