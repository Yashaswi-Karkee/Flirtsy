// pages/profile.js

import React from "react";

const Profile = ({ user }) => {
  return (
    <div className="bg-gray-100 min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-gray-800">
                  {user.name}
                </h1>
                <p className="text-lg text-gray-600">{user.email}</p>
                <p className="text-lg text-gray-600">Age: {user.age}</p>
              </div>
            </div>
            <div className="mt-8">
              <div className="text-lg text-gray-600">
                <p>Bio: {user.bio}</p>
                <p>Hobbies: {user.hobbies.join(", ")}</p>
                <p>Interests: {user.interests.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  // Fetch user data from server
  const res = await fetch("https://api.example.com/user");
  const user = await res.json();

  return {
    props: {
      user,
    },
  };
}

export default Profile;
