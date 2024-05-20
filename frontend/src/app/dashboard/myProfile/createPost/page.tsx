"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { createPost } from "@/api/postsAPI";


const CreatePostForm = ({onCreate}:any) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    // Create a new FormData object
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('postPicture', image);
    try{
      const response = await createPost(formData);
      console.log(response);
      router.push("/dashboard/myProfile");
    }
    catch(error){
      console.error("Error creating post:", error);
    }
  };

  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="mb-4">
        <label htmlFor="caption" className="block mb-1">Caption</label>
        <textarea
          id="caption"
          name="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          rows={4}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block mb-1">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create Post</button>
    </form>
  );
};

export default CreatePostForm;
