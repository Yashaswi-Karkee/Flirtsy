"use client";

import React from "react";

import { useRouter } from "next/navigation";

const Profile = ({ name, profilePic }: any) => {
  const router = useRouter();
  const handleCreatePost = () => {
    router.push("/dashboard/myProfile/createPost");
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-4">
        <img
          src={profilePic}
          alt="Profile"
          className="w-8 h-8 rounded-full mr-2"
        />
        <p className="font-semibold">{name}</p>
      </div>
      {/* Add more profile details here */}
      <button
        onClick={handleCreatePost}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Create Post
      </button>
    </div>
  );
};

export default Profile;
