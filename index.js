import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import logger from './src/utils/logger.js'
import cron from 'node-cron'
import cors from 'cors'
import userRouter from './src/routes/userRouter.js'


dotenv.config()



const app =express()
const port = process.env.API_PORT || 3000
var corsOptions={
    origin:"http://localhost/5173",
    credentials:true,
    OptionsSuccessStatus:200,
}
// app.use (cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions))

//health route
app.get('/health',(req,res)=>{
    res.status(200).json({message:'Hello everyone .....I am happy'})
})



// schedule sending email
// cron.schedule('*/5 * * * * *', () => {

//     logger.info("sending email after every five seconds ...............");
//     sendWelcomeEmailToNewUsers()

// });
app.use('/api',userRouter)


app.listen(port, ()=>{
    logger.info(`The server is running on http://localhost:${port}`);
})