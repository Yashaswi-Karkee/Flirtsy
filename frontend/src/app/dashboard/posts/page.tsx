"use client"

import Post from "@/components/Posts";
import React, { useState, useEffect } from "react";
import { getAllPosts } from "../../../api/postsAPI"; // Import the function to fetch posts

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getAllPosts(); // Fetch posts from the backend API
        if (fetchedPosts) {
          setPosts(fetchedPosts);
          console.log(fetchedPosts)
          return (console.log(posts)) // Update the state with the fetched posts
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(); // Call the fetchPosts function when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts
  
  return (
    <div className="max-w-lg mx-auto mt-8">
      {posts.length > 0 ? (
        posts.map((post:any, index) => (
          <Post key={index} {...post} />
        ))
      ) : (
        <div className="text-center text-gray-500 py-8">
          No posts available
        </div>
      )}
    </div>
  );
};

export default Feed;
