"use client";
import React, { useState } from 'react';

const UpdatePostForm = ({ postData, onUpdate }: any) => {
  const [caption, setCaption] = useState(postData.caption);
  const [image, setImage] = useState(postData.image);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onUpdate({ caption, image });
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
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Update Post</button>
    </form>
  );
};

export default UpdatePostForm;
