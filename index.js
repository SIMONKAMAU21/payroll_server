import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import logger from './src/utils/logger.js'
import cors from 'cors'
import userRouter from './src/routes/userRouter.js'
import positionRouter from './src/routes/positionRouter.js'
import SchedulesRouter from './src/routes/scheduleRouter.js'
import AttendanceRouter from './src/routes/attendanceRouter.js'
import DeductionRouter from './src/routes/deductionRouter.js'
import AdvanceRouter from './src/routes/addvanceRouter.js'
import OvertimeRouter from './src/routes/overtimeRouter.js'
import PayrollRouter from './src/routes/PayrollRouter.js'
import messageRouter from './src/routes/messageRouter.js'
import conversationRouter from './src/routes/conversationRouter.js'
import participantRouter from './src/routes/participantRouter.js'


dotenv.config()
const app =express()
const port = process.env.API_PORT || 8000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

//health route
app.get('/health',(req,res)=>{
    res.status(200).json({message:'Hello everyone .....I am happy'})
})



app.use('/api',SchedulesRouter)
app.use('/api',userRouter),
app.use('/api',positionRouter)
app.use('/api',AttendanceRouter)
app.use('/api',DeductionRouter)
app.use('/api',AdvanceRouter)
app.use('/api',OvertimeRouter)
app.use("/api",PayrollRouter)
app.use("/api",messageRouter)
app.use("/api",conversationRouter)
app.use("/api",participantRouter)


app.listen(port, ()=>{
    logger.info(`The server is running on http://localhost:${port}`);
})