import { addAdvance, deleteAdvance, getAllAdvanceController, updateAdvance } from "../controllers/AdvanceController.js";
import { Router } from "express";

const AdvanceRouter = Router();
AdvanceRouter.get("/Advance",getAllAdvanceController) 
AdvanceRouter.put('/Advance/update/:ID',updateAdvance);
AdvanceRouter.post('/Advance/register',addAdvance);
AdvanceRouter.delete('/Advance/delete/:ID',deleteAdvance);

export default AdvanceRouter                                                                                     