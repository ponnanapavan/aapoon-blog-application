import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import { ImagePlus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCookies } from 'react-cookie';

const PostCreate = () => {
  const [formData, setFormData] = useState({
    postType: "",
    postTitle: "",
    postContent: "",
    postImage: null, // This will store a Base64 string
    readTime: 0
  });

  // Make sure the cookie name matches the one you set in your backend
  const [cookies] = useCookies(['blog-token']);
  console.log('Cookies:', cookies); // Log cookies to ensure token is present

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData(prevState => ({
          ...prevState,
          postImage: reader.result // Store the Base64 string
        }));
      };

      reader.readAsDataURL(file); // Convert file to Base64 string
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiResponse = await fetch("http://localhost:5000/api/posts/v1/createPost", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies['blog-token']}` // Make sure this matches the cookie name
        },
        body: JSON.stringify(formData) // postImage is now a Base64 string
      });

      const result = await apiResponse.json();
      console.log(result);

      // Handle response accordingly, e.g., show success message or handle errors

    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-8">
      <h1 className="text-3xl font-bold mb-8 w-full flex justify-start text-gray-800">
        Create a Post
      </h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-10 w-full max-w-4xl">
        <div className="grid grid-cols-1 gap-8">
          <div className="w-full">
            <Label htmlFor="postType" className="text-lg font-semibold text-gray-700">Blog Type</Label>
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
            <Label htmlFor="postTitle" className="text-lg font-semibold text-gray-700">Blog Title</Label>
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
            <Label htmlFor="postContent" className="text-lg font-semibold text-gray-700">Blog Content</Label>
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
            <Label htmlFor="postImage" className="text-lg font-semibold text-gray-700">Featured Image</Label>
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
                <span className="ml-3 text-sm text-gray-500">{formData.postImage.name}</span>
              )}
            </div>
          </div>

          <div className="w-full">
            <Label htmlFor="readTime" className="text-lg font-semibold text-gray-700">Time to Read (minutes)</Label>
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
              <Button><Loader2 className='animate-spin'/></Button>
            ) : (
              <button
                type="submit"
                className="bg-indigo-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
