"use client"

import React, { useState } from 'react';
import { origin_url } from '../../../api/authenticationAPI';
import {updateProfile, updatePassword} from '../../../api/authenticationAPI'
import { toast } from 'react-toastify';
import {useRouter} from 'next/navigation'
import {getSessionItems} from '../../../utils/getSessionItems'

const session:any = getSessionItems();

const ProfileSettingsPage = () => {
  const router = useRouter();
  const [profileFormData, setProfileFormData] = useState({
    fullName: session.name,
    email: session.email,
    bio: session.bio,
    avatar: session.avatar,
  });

  const [passwordFormData, setPasswordFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });


  const handleProfileChange = (e: any) => {
    const { name, value } = e.target;
    setProfileFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e: any) => {
    e.preventDefault();
    try{
      const response = await updateProfile(profileFormData);
      if(response){
        toast("Profile Updated")
        router.push('/dashboard/myProfile')
      }
    }catch(err){
      toast("Error updating profile")
      console.log(profileFormData);
    }
  };

  const handleAvatarChange = (e: any) => {
    const file = e.target.files[0];
    // Validate file type here
    if (file && isValidFileType(file)) {
      setProfileFormData((prevData) => ({
        ...prevData,
        avatar: file,
      }));
    } else {
      // Reset avatar field or show error message
      setProfileFormData((prevData) => ({
        ...prevData,
        avatar: null,
      }));
    }
  };

  const isValidFileType = (file: any) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    return validTypes.includes(file.type);
  };

  const handlePasswordChange = (e: any) => {
    const { name, value } = e.target;
    setPasswordFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (e: any) => {
    e.preventDefault();
    try{
      const response = await updatePassword(passwordFormData);
      if(response){
        toast("Password Updated")
        router.push('/dashboard/myProfile')
      }
      else{
        toast("Password do not match")
      }
    }catch(err){
      toast("Error updating password")
  };
}

  return (
    <div className="max-w-xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-semibold mb-8 text-center">Profile Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={handleProfileSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block mb-1">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={profileFormData.fullName}
                onChange={handleProfileChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileFormData.email}
                onChange={handleProfileChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bio" className="block mb-1">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={profileFormData.bio}
                onChange={handleProfileChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                rows={4}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="avatar" className="block mb-1">Avatar URL</label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept='.png,.jpg,.jpeg'
                onChange={handleAvatarChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Update Profile</button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label htmlFor="current_password" className="block mb-1">Current Password</label>
              <input
                type="password"
                id="current_password"
                name="current_password"
                value={passwordFormData.current_password}
                onChange={handlePasswordChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="new_password" className="block mb-1">New Password</label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                value={passwordFormData.new_password}
                onChange={handlePasswordChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirm_password" className="block mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={passwordFormData.confirm_password}
                onChange={handlePasswordChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Change Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
