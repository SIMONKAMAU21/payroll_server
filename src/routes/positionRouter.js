import { Router } from "express";
import { addPosition, deleteposition, getAllpositionByIdController, getAllpositionController, updateposition } from "../controllers/positionController.js";
import { auth } from "../middlewares/userAuthentication.js";

const positionRouter = Router();
positionRouter.get("/positions",auth,getAllpositionController)
positionRouter.get("/positions/:PositionID",auth,getAllpositionByIdController)
positionRouter.put('/positions/update/:ID',auth,updateposition);
positionRouter.post('/positions/register',auth,addPosition);
positionRouter.delete('/positions/delete/:ID',auth,deleteposition);

export default positionRouter                                                                                     