import express from 'express'
import { deletePost, getAllPosts, getParticularPost, likePost, PostController, updatePost } from '../controllers/postController.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router=express.Router();

router.post('/createPost',protectRoute,  PostController)
router.get('/getallposts',protectRoute,getAllPosts);
router.delete('/deletepost/:id',protectRoute,deletePost)

router.post('/likepost/:postId',protectRoute,likePost)

router.put('/updatepost/:postId',protectRoute,updatePost)

router.get('/particulatpost/:postId',protectRoute,getParticularPost);


export {router as postRouter}