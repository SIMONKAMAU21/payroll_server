import { Router } from "express";
import { createConversationController, getConversationController } from "../controllers/conversationController.js";
import { auth } from "../middlewares/userAuthentication.js";


const conversationRouter= Router()
conversationRouter.post("/conversation",auth,createConversationController)
conversationRouter.get("/conversations",auth,getConversationController)




export default conversationRouter