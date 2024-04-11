import { addAdvance, deleteAdvance, getAllAdvanceController, updateAdvance } from "../controllers/AdvanceController.js";
import { Router } from "express";
import { auth } from "../middlewares/userAuthentication.js";

const AdvanceRouter = Router();
AdvanceRouter.get("/Advance",auth,getAllAdvanceController) 
AdvanceRouter.put('/Advance/update/:ID,auth',updateAdvance);
AdvanceRouter.post('/Advance/register',auth,addAdvance);
AdvanceRouter.delete('/Advance/delete/:ID',auth,deleteAdvance);

export default AdvanceRouter                                                                                     