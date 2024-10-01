import express from 'express'

import cors from 'cors';

import dotenv from 'dotenv';
import { connectDb } from './database/db.js';
import { authRouter } from './routes/authRouter.js';
import { postRouter } from './routes/postRouter.js';
import cookieParser from 'cookie-parser';


const app=express();

dotenv.config();

app.use(express.json({ limit: '20mb' })); 
app.use(cors({
      origin: 'http://localhost:5173',  
      credentials: true,                
    }));
app.use(cookieParser())//used to handle cookies

app.use('/api/auth/v1',authRouter)
app.use('/api/posts/v1',postRouter)

app.listen(process.env.PORT,()=>{
      console.log("server is running")
      connectDb()
})