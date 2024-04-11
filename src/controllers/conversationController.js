import { sendBadRequest, sendCreated, sendNotFound, sendServerError, sendSuccess } from '../helper/helper.function.js';
import { createConversation, getConversationBy} from '../services/conversationService.js';



export const createConversationController= async(req,res)=>{
   const {Title}=req.body
   try {
      const newConversation={Title};
      const respone= await createConversation(newConversation);
      res.status(200).send(respone)
   } catch (error) {
      console.log('error', error)
      sendServerError(res,"internal sever error")
   }
}

export const getConversationController = async (req,res)=>{
   try {
      const response = await getConversationBy();
      if (response.legnth===0) {
         sendNotFound(res,"no conversation")
      } else {
         res.status(200).send(response)
      }
    
   } catch (error) {
      return error.message
   }
}