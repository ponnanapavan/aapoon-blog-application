import checkPassword from "../helper/passwordCheck.js";
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const Signup=async(req,res)=>{
    const {username,email,password,name}=req.body;
    
        try{
               if(!username || !email || !password || !name){
                    return res.status(400).json({erorr:"all fields are required"})
               }
                 
                  if(!checkPassword(password)){
                        return res.status(400).json({error:"password is not strong"})
                  }

                const hashPassword=await bcrypt.hash(password,10);
               const newUser=new userModel({username,email,password:hashPassword,name});

               await newUser.save();

               const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET,{expiresIn:'3d'});

             
              res.json({token,userId:newUser._id});
  

             

        }catch(err){

            res.status(500).json({error:err.message});
               
        }
}

export const Login=async(req,res)=>{
        try{
               const {username,password}=req.body;
               if(!username || !password){
                   return res.status(400).json({error:"all fields are required"});
               }

                 const checkUser=await userModel.findOne({username});

                 if(!checkUser){
                       return res.status(400).json({error:"user not found"});
                 }

                 const checkPassword=await bcrypt.compare(password,checkUser.password);

                 if(!checkPassword){
                    return res.status(400).json({error:"password is not correct"});
                 }
                 const token=jwt.sign({userId:checkUser._id},process.env.JWT_SECRET,{expiresIn:'3d'});
             

                 res.json({token,userId:checkUser._id});
  
          


        }catch(err){
               res.status(500).json({error:err.message});

        }
    }


export const Logout=async(req,res)=>{
      try{
            res.clearCookie('blog-token');
            res.json({message:"Logout out successfully"})

          

      }catch(err){

        res.status(500).json({error:err.message})
          
      }
}