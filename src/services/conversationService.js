import { poolRequest } from "../utils/dbConnect.js";
import sql from "mssql";

export const createConversation = async (newConversation) => {
  try {
    const queryResult = await poolRequest()
      .input("Title", sql.VarChar, newConversation.Title)
      .query("INSERT INTO Conversations (Title) VALUES (@Title)");
    return queryResult;
  } catch (error) {
    throw new Error("Failed to create conversation");
  }
};

export const getConversationBy = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Conversations ");
    return result.recordset;
  } catch (error) {
    throw new Error("Failed to retrieve conversation");
  }
};

export const updateConversation = async (conversationId, newCreatedAt) => {
  try {
    await poolRequest(
      "UPDATE Conversations SET Created_at = ? WHERE Conversation_Id = ?",
      [newCreatedAt, conversationId]
    );
    return true;
  } catch (error) {
    throw new Error("Failed to update conversation");
  }
};

export const deleteConversation = async (conversationId) => {
  try {
    await poolRequest("DELETE FROM Conversations WHERE Conversation_Id = ?", [
      conversationId,
    ]);
    return true;
  } catch (error) {
    throw new Error("Failed to delete conversation");
  }
};
