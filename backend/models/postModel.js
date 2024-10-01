import mongoose from 'mongoose'

const postSchema=new mongoose.Schema({
       postType:{type:String},

       postTitle:{type:String},

       postContent:{type:String},

       postImage:{type:String},

       author:{type:mongoose.Schema.Types.ObjectId,ref:"user"},

       readTime:{type:Number},

       createdAt:{type:Date,default:Date.now},

       likes:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}]


})


const postModel=mongoose.model('post',postSchema);

export default postModel;