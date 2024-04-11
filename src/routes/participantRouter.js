import { Router } from "express";
import { allParticipantsController, getParticipantByIdController, sendParticipantController } from "../controllers/participantController.js";
import { auth } from "../middlewares/userAuthentication.js";




const participantRouter=Router()

participantRouter.post("add//participant",auth,sendParticipantController)
participantRouter.get("/participant",auth,allParticipantsController)
participantRouter.get("/participant/:ID",auth,getParticipantByIdController)

export default participantRouter