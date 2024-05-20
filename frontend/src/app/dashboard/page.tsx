"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { profileMatcher, origin_url } from '@/api/authenticationAPI';

const MatchingProfilesCarousel = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await profileMatcher() // Replace this with your actual API endpoint
        setProfiles(response);
      } catch (error) {
        console.error('Error fetching matching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="flex flex-no-wrap overflow-x-auto">
      {profiles.map(profile => (
        <div key={profile.id} className="w-64 p-4 mr-4 border rounded shadow-md">
          <img src={origin_url + profile.profile_picture} alt={profile.name} className="w-full h-auto mb-2 rounded" />
          <h3 className="text-lg font-semibold">{profile.name}</h3>
          <p className="text-gray-600">Age: {profile.age}</p>
          <p className="text-gray-600">Gender: {profile.gender}</p>
          {/* Add more profile information as needed */}
        </div>
      ))}
    </div>
  );
};

export default MatchingProfilesCarousel;
