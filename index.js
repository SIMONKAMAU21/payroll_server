import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import logger from './src/utils/logger.js'
import cron from 'node-cron'
import cors from 'cors'
import { sendWelcomeEmailToNewUsers } from './src/config/mailConfig.js'



dotenv.config()



const app =express()
const port = process.env.API_PORT || 3000
// app.use (cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

//health route
app.get('/health',(req,res)=>{
    res.status(200).json({message:'Hello everyone .....I am happy'})
})



// schedule sending email
cron.schedule('*/5 * * * * *', () => {

    logger.info("sending email after every five seconds ...............");
    sendWelcomeEmailToNewUsers()

});


app.listen(port, ()=>{
    logger.info(`The server is running on http://localhost:${port}`);
})