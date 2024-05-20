"use client";

import Post from "@/components/Posts";
import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";
import { getUserPosts, deletePost } from "@/api/postsAPI";


const Feed = () => {

  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts: any = await getUserPosts(); // Fetch posts from the backend API
        if (fetchedPosts) {
          // Update the state with the fetched posts
          setPosts(fetchedPosts);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(); // Call the fetchPosts function when the component mounts
  },[]);

  const router = useRouter();

  const handleEditPost = (id:any) => {
    router.push(`/dashboard/myProfile/updatePost/${id}`);
    console.log("Edit post");
  };

  const handleDeletePost = async (id:any) => {
    try{
      const response = await deletePost(id);
      console.log(response);
      setPosts(posts.filter((post:any) => post.id !== id));
    }
    catch(error){
      console.log(error);
    }
  };

  console.log(posts);

   return (
    <div className="max-w-lg mx-auto mt-8">
      <Profile />
      {posts.map((post:any) => (
        <>
          <Post key={post.id} {...post}></Post>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => handleEditPost(post.id)}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <FaPencilAlt className="h-5 w-5 mr-1" /> Edit
            </button>
            <button
              onClick={() => handleDeletePost(post.id)}
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
