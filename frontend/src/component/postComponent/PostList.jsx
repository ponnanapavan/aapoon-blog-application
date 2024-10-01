import { Button } from '@/components/ui/button';
import { likeContext } from '@/context/LikeContext';
import { BookOpenCheckIcon, HeartIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import likeSvg from '../../svg/like.svg'
import { Link } from 'react-router-dom';

const PostList = ({ item,setFormData }) => {

    console.log(item);
  const [cookies,_]=useCookies(['blog-token']);
 
  const userId=localStorage.getItem('userId')

  async function onDelete(){

    try{
          const apiresponse=await fetch(`http://localhost:5000/api/posts/v1/deletepost/${item._id}`,{
               method:"DELETE",
               headers:{
                    'Authorization': `Bearer ${cookies['blog-token']}`
               }
          })
           const result=await apiresponse.json();
           console.log(result);
           if(!result.error)
           setFormData(result);
    }catch(err){
         console.error(err.message);
    }
       
   }

   async function LikePost() {
    try {
        const apiResponse = await fetch(`http://localhost:5000/api/posts/v1/likepost/${item._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies['blog-token']}`
            }
        });

        const result = await apiResponse.json();
        console.log(result);

        if (!result.error) {
          
            setFormData(prevData => 
                prevData.map(postItem => 
                    postItem._id === result._id ? result : postItem
                )
            );
        }
    } catch (err) {
        console.error(err.message);
    }
}

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer">
      
      <div className='w-full flex justify-between items-center'>
      <h2 className=' text-md p-6'><span className='text-lg font-bold text-gray-600'>Author:</span>{item?.author?.name}</h2>
       <span className='flex gap-2'><BookOpenCheckIcon />{item?.readTime && `${item.readTime} min`}</span>
      </div>
      
      {item?.postImage && (
        <img
          src={item.postImage} 
          alt={item.postTitle} 
          className="w-full h-60 object-cover rounded-t-lg"
        />
      )}

      <div className="p-4">

       
        
        <span className="text-indigo-500 text-xs font-semibold uppercase tracking-wide">{item?.postType || 'Blog'}</span>

        <h2 className="text-xl font-bold text-gray-800 mt-2 mb-2">{item?.postTitle || 'Untitled Post'}</h2>

       
        <p className="text-gray-600 text-sm line-clamp-2">
          {item?.postContent || 'No content available.'}
        </p>
      </div>
      <div className='w-full flex justify-between items-center'>
      <div>
    {item.likes.length > 0 ? (
        <div>
            {item.likes.includes(userId) ? (
               
                <HeartIcon 
                    onClick={() => LikePost()} 
                    style={{ 
                        color: 'red',     // Fill the heart with red
                        fontSize: '24px', 
                        stroke: 'red',    // Red stroke
                        strokeWidth: '2px' // Adjust stroke width if needed
                    }} 
                />
            ) : (
               
                <HeartIcon 
                    onClick={() => LikePost()} 
                    style={{ 
                  
                        fontSize: '24px', 
                          
                        strokeWidth: '2px' 
                    }} 
                />
            )}
        </div>
    ) : (
        // Default white heart if there are no likes
        <HeartIcon 
            onClick={() => LikePost()} 
            style={{ 
                 color:'black',
                fontSize: '24px', 
                strokeWidth: '2px' 
            }} 
        />
    )}
    <span>{item.likes.length} likes</span>
</div>


         <div className='flex gap-5'>
          
         <Button onClick={()=>onDelete()}><Trash2Icon/></Button>
          <Link to={`/updatePost/${item._id}`}>
          <Button><PencilIcon/></Button>
          </Link>
         </div>
      </div>
    </div>
  );
};

export default PostList;
