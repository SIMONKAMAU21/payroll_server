import { Router } from "express";
import { deleteMessage, getMessagesController, sendMessageController } from "../controllers/messageController.js";
import { auth } from "../middlewares/userAuthentication.js";


const messageRouter= Router();
messageRouter.post("/sendmessages",auth,sendMessageController)
messageRouter.get("/messages/:ID",auth,getMessagesController)
messageRouter.delete("/messages/delete/:ID",auth,deleteMessage)

export default messageRouter