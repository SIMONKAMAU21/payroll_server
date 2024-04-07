import { Router } from "express";
import { addPosition, deleteposition, getAllpositionByIdController, getAllpositionController, updateposition } from "../controllers/positionController.js";

const positionRouter = Router();
positionRouter.get("/positions",getAllpositionController)
positionRouter.get("/positions/:PositionID",getAllpositionByIdController)
positionRouter.put('/positions/update/:ID',updateposition);
positionRouter.post('/positions/register',addPosition);
positionRouter.delete('/positions/delete/:ID',deleteposition);

export default positionRouter                                                                                     