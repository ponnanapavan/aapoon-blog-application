import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { ImagePlus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UpdatePost = () => {
  const { postId } = useParams();
  const [cookies, _] = useCookies(['blog-token']);

  const [formData, setFormData] = useState({
    postType: '',
    postTitle: '',
    postImage: '',
    postContent: '',
    readTime: 0,
  });
  const router=useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image upload and convert to base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          postImage: reader.result, // Store the Base64 string
        }));
      };

      reader.readAsDataURL(file); // Convert file to Base64 string
    }
  };

  // Fetch post data when the component mounts
  useEffect(() => {
    async function getPost() {
      try {
        const apiResponse = await fetch(
          `http://localhost:5000/api/posts/v1/particulatpost/${postId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${cookies['blog-token']}`,
            },
          }
        );
        const result = await apiResponse.json();
        console.log("bhdbfhv")

        setFormData((prevState) => ({
          ...prevState,
          ...result,
        }));
      } catch (err) {
        console.error(err.message);
      }
    }
    getPost();
  }, [postId, cookies]);


  async function handleSubmit(e) {
    e.preventDefault(); 
    console.log(formData);

    setLoading(true);

    try {
      const apiResponse = await fetch(`http://localhost:5000/api/posts/v1/updatepost/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies['blog-token']}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await apiResponse.json();
      if(!result.error)
        router('/getAllPosts')
      
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }

    console.log("dnhfvn")
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-8">
      <h1 className="text-3xl font-bold mb-8 w-full flex justify-start text-gray-800">
        Update Post
      </h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-10 w-full max-w-4xl">
        <div className="grid grid-cols-1 gap-8">
          <div className="w-full">
            <Label htmlFor="postType" className="text-lg font-semibold text-gray-700">
              Blog Type
            </Label>
            <Input
              id="postType"
              name="postType"
              type="text"
              required
              placeholder="Enter type of blog"
              value={formData.postType}
              onChange={handleInputChange}
              className="w-full h-16 border-2 text-lg border-gray-300 rounded-md p-4 mt-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="w-full">
            <Label htmlFor="postTitle" className="text-lg font-semibold text-gray-700">
              Blog Title
            </Label>
            <Input
              id="postTitle"
              name="postTitle"
              type="text"
              required
              placeholder="Enter blog title"
              value={formData.postTitle}
              onChange={handleInputChange}
              className="w-full h-16 border-2 text-lg border-gray-300 rounded-md p-4 mt-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="w-full">
            <Label htmlFor="postContent" className="text-lg font-semibold text-gray-700">
              Blog Content
            </Label>
            <Textarea
              id="postContent"
              name="postContent"
              required
              placeholder="Write your blog content here..."
              value={formData.postContent}
              onChange={handleInputChange}
              className="w-full h-40 border-2 text-lg border-gray-300 rounded-md p-4 mt-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="w-full">
            <Label htmlFor="postImage" className="text-lg font-semibold text-gray-700">
              Featured Image
            </Label>
            <div className="mt-2 flex items-center">
              <Input
                id="postImage"
                name="postImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden text-lg"
              />
              <button
                type="button"
                onClick={() => document.getElementById('postImage').click()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <ImagePlus className="h-5 w-5 mr-2 text-gray-400" />
                {formData.postImage ? 'Change Image' : 'Upload Image'}
              </button>
              {formData.postImage && (
                <span className="ml-3 text-sm text-gray-500">Image Uploaded</span>
              )}
            </div>
          </div>

          <div className="w-full">
            <Label htmlFor="readTime" className="text-lg font-semibold text-gray-700">
              Time to Read (minutes)
            </Label>
            <Input
              id="readTime"
              name="readTime"
              type="number"
              required
              placeholder="Estimated time to read"
              value={formData.readTime}
              onChange={handleInputChange}
              className="w-full h-12 text-lg border-2 border-gray-300 rounded-md p-4 mt-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="w-full flex justify-end mt-4">
            {loading ? (
              <Button>
                <Loader2 className="animate-spin" />
              </Button>
            ) : (
              <button
                type="submit"
                className="bg-indigo-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
              >
                Update Post
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
