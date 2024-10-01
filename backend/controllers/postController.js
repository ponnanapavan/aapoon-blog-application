import postModel from "../models/postModel.js";

export const PostController=async(req,res)=>{
    
    const userId=req.user._id;
    
  
    const postData=req.body;
    postData['author']=userId;
  
         try{
               const newPost=new postModel(postData);

               await newPost.save();

               res.status(201).json({message:"post created"})

         }catch(err){
              res.status(500).json({error:err.message});
              
         }
}



export const getAllPosts=async(req,res)=>{
        try{
               const getAllposts=await postModel.find({}).populate("author",' name ').sort({createdAt:-1});
                if(getAllposts.length==0)
                return res.status(400).json({error:"no posts are found"})
                console.log(getAllposts)
                res.status(201).json(getAllposts);
             

        }catch(err){
              res.status(400).json({error:err.message})
        }
}





export const getParticularPost=async(req,res)=>{
         const {postId}=req.params;
         console.log("dnvhfbvfvhf")
         try{
                const getPost=await postModel.findById(postId).select("postContent postImage postTitle postType readTime");
                if(!getPost){
                      res.status(400).json({error:"no post found"});
                }
                    res.status(200).json(getPost);

         }catch(err){

              res.status(500).json({error:err.message})
               
         }
}



export const deletePost=async(req,res)=>{
    const {id}=req.params;
    

        try{
               const deletePost=await postModel.findById(id);
               if(!deletePost){
                return res.status(400).json({error:"no post found"});
            }

               if(req.user._id.toString()!== deletePost.author.toString()){
                return res.status(401).json({error:"unauthorized user"})
           }

              await postModel.findByIdAndDelete(id);

                 const getAllPosts=await postModel.find({}).populate("author","name").sort({createdAt:-1});
                  res.status(201).json(getAllPosts);

        }catch(err){
              res.status(500).json({error:err.message});
              
        }
}




export const updatePost=async(req,res)=>{
    const updateData=req.body;
    const {postId}=req.params;
       try{
             const getPost=await postModel.findById(postId);
             if(!getPost){
                  return res.status(404).json({error:'post not found'})
             }
             if(req.user._id.toString()!==getPost.author.toString()){
                  return res.status(401).json({error:"unauthorized user"})
             }
          const updatePost=await postModel.findByIdAndUpdate(postId,{$set:updateData},{new:true});
          res.status(200).json({message:'updated sucessfully'})
          
       }catch(err){
           res.status(500).json({error:err.message})
       }
}




export const likePost=async(req,res)=>{

    const {postId}=req.params;
    try{

        const post=await postModel.findById(postId);

        if(!post){
              return res.status(400).json({error:"post is not found"})
        }

        if(req.user._id.toString() === post.author.toString()){

            return res.status(400).json({error:'you cannot like your own post'})

        }

         if(post.likes.includes(req.user._id))
        {
             post.likes= post.likes.filter(id=>id.toString()!== req.user._id.toString())
         }
         else{
              post.likes.push(req.user._id);
         }
            await post.save();

            res.status(200).json(post);

    }catch(err){
          res.status(500).json({error:err.message})
    }
}