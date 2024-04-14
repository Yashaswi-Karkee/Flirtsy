"use client";

import Post from "@/components/Posts";
import React, { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";


const Feed = () => {
  const [profileDetails] = useState({
    name: "John Doe",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    // Add more profile details here
  });
  const router = useRouter();

  const handleEditPost = () => {
    router.push("/dashboard/myProfile/updatePost");
    console.log("Edit post");
  };

  const handleDeletePost = () => {
    // Implement delete post functionality
    console.log("Delete post");
  };

  const posts = [
    {
      name: "John Doe",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image:
        "https://www.onelovelylife.com/wp-content/uploads/2020/07/Toast-Ideas12B.jpg",
    },
    {
      name: "Jane Smith",
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
      caption:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://www.onelovelylife.com/wp-content/uploads/2020/07/Toast-Ideas12B.jpg",
    },
  ];

  return (
    <div className="max-w-lg mx-auto mt-8">
      <Profile {...profileDetails} />
      {posts.map((post, index) => (
        <>
          <Post key={index} {...post}></Post>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleEditPost}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <FaPencilAlt className="h-5 w-5 mr-1" /> Edit
            </button>
            <button
              onClick={handleDeletePost}
              className="flex items-center text-red-500 hover:text-red-700"
            >
              <FaTrash className="h-5 w-5 mr-1" /> Delete
            </button>
          </div>
        </>
      ))}
    </div>
  );
};

export default Feed;
