import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import logger from './src/utils/logger.js'
import cors from 'cors'
import userRouter from './src/routes/userRouter.js'
import positionRouter from './src/routes/positionRouter.js'
import SchedulesRouter from './src/routes/scheduleRouter.js'


dotenv.config()



const app =express()
const port = process.env.API_PORT || 3000

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


app.listen(port, ()=>{
    logger.info(`The server is running on http://localhost:${port}`);
})