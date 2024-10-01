import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import { useCookies } from 'react-cookie';
import { Skeleton } from "@/components/ui/skeleton"

const GetAllPosts = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const[cookies,_]=useCookies(['blog-token'])

  useEffect(() => {
    async function allPosts() {
      try {
        const apiResponse = await fetch("http://localhost:5000/api/posts/v1/getallposts", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${cookies['blog-token']}` // Make sure this matches the cookie name
          },
        });

        if (apiResponse.error) {
          throw new Error('Failed to fetch posts');
        }

        const response = await apiResponse.json();
        console.log(response);
        setFormData(response); 
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    }

    allPosts();
  }, []);

  return (
    <div className="p-6 mx-auto w-full max-w-2xl"> {/* Adjusted max width */}
      {loading ? ( // Show loading indicator
      [0,1,2,3].map((item,idx)=>(
        <div  key={idx} className="flex flex-col   space-y-3 mx-auto justify-center items-center">
           <Skeleton className="h-[500px] w-[600px] rounded-xl mt-4" />
           
         </div>

      ))
           
      
      ) : error ? ( 
        <p className="text-center text-red-500">{error}</p>
      ) : formData.length > 0 ? (
        formData.map((item, key) => (
          <div key={key} className="mb-6"> {/* Add margin bottom for spacing between posts */}
            <PostList item={item}  setFormData={setFormData} />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No posts available.</p>
      )}
    </div>
  );
};

export default GetAllPosts;
