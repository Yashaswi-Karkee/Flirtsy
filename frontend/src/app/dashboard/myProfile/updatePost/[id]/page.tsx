"use client"

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from "next/navigation";
import { updatePost, getSinglePost } from "@/api/postsAPI";

const UpdatePostForm = () => {
  const router = useRouter();
  const { id }: any = useParams();

  const [formData, setFormData] = useState({
    caption: "",
    postPicture: null
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getSinglePost(id);
        setFormData((prevData) => ({
          ...prevData,
          caption: response.caption,
        }));
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await updatePost(id, formData);
      console.log(response);
      router.push("/dashboard/myProfile");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const isValidFileType = (file: any) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    return validTypes.includes(file.type);
  };


  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    // Validate file type here
    if (selectedImage && isValidFileType(selectedImage)) {
      setFormData((prevData) => ({
        ...prevData,
        postPicture: selectedImage,
      }));
    } else {
      // Reset avatar field or show error message
      setFormData((prevData) => ({
        ...prevData,
        postPicture: null,
      }));
    }
  };

  console.log(formData)
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="mb-4">
        <label htmlFor="caption" className="block mb-1">Caption</label>
        <textarea
          id="caption"
          name="caption"
          value={formData.caption}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full"
          rows={4}
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block mb-1">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept=".png,.jpg,.jpeg"
          onChange={handleImageChange}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Update Post</button>
    </form>
  );
};

export default UpdatePostForm;
function isValidFileType(selectedImage: any) {
  throw new Error('Function not implemented.');
}

