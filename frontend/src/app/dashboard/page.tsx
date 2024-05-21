"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { profileMatcher, origin_url } from "@/api/authenticationAPI";
import { getSessionItems } from "@/utils/getSessionItems";
import Link from "next/link";

const MatchingProfilesCarousel = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const session = getSessionItems();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await profileMatcher();
        setProfiles(response);
      } catch (error) {
        console.error("Error fetching matching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  const prevProfile = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? profiles.length - 1 : prevIndex - 1
    );
  };

  const nextProfile = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === profiles.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-screen-xl mx-auto flex justify-center items-center mt-24">
      <div className="flex flex-no-wrap overflow-x-auto overflow-y-hidden rounded-lg shadow-md">
        {profiles.map((profile, index) => (
          <div
            key={profile.id}
            className={`w-full sm:w-96 p-4 mx-2 sm:mx-4 bg-white rounded-lg transition-opacity ${
              index >= currentIndex && index <= currentIndex + 2
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            <div className="flex flex-col items-center">
              <img
                src={origin_url + profile.profile_picture}
                alt={profile.name}
                className="w-40 h-40 rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{profile.name}</h3>
              <p className="text-gray-600 mb-2">Age: {profile.age}</p>
              <p className="text-gray-600 mb-4">{profile.bio}</p>
              <div className="flex flex-wrap justify-center">
                <div className="flex items-center justify-center bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2">
                  {profile.gender}
                </div>
                <div className="flex items-center justify-center bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2">
                  DOB: {profile.dob}
                </div>
              </div>
              <div className="flex flex-wrap justify-center mt-4">
                <div className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2">
                  {profile.hobbies}
                </div>
              </div>
              <div className="flex flex-wrap justify-center mt-4">
                <div className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2">
                  {profile.interests}
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Link
                href={`http://localhost:8000/chat/room/${session.userId}/${profile.id}/`}
              >
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Chat
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevProfile}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 rounded-full p-2"
      >
        {"<"}
      </button>
      <button
        onClick={nextProfile}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 rounded-full p-2"
      >
        {">"}
      </button>
    </div>
  );
};

export default MatchingProfilesCarousel;
