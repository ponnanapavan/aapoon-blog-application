import mongoose, { mongo } from 'mongoose'

export const connectDb=async()=>{
       try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected");

       }catch(err){

          console.error(err.message);
         
       }
}