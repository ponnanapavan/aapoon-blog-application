import jwt from  'jsonwebtoken'
import userModel from '../models/userModel.js';


export const protectRoute=async(req,res,next)=>{
         try{
               const token=req.cookies['blog-token']

               console.log(token)

               if(!token){
                   return res.status(401).json({error:"unauthorised user"})
               }
               const decode=jwt.verify(token,process.env.JWT_SECRET);

               if(!decode){
                return res.status(401).json({error:"unauthorised user"})
                 
               }

               const user=await userModel.findOne({_id:decode.userId});

               if(!user){
                  return res.status(400).json({error:'user not found'});
               }

               req.user=user;
               next();

         }catch(err){

            res.status(500).json({error:err.message});

         }
}