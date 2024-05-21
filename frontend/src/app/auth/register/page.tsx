"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { register } from "../../../api/authenticationAPI";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  const [document, setDocument] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [age, setAge] = useState("");
  const [ageGroupMin, setAgeGroupMin] = useState("");
  const [ageGroupMax, setAgeGroupMax] = useState("");
  const [isInterestedIn, setIsInterestedIn] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [interests, setInterests] = useState("");
  const router = useRouter();

  const handleRegister = async (event: any) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast("Passwords do not match");
      return;
    } else {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password2", confirmPassword);
      formData.append("name", name);
      formData.append("tc", "True"); // Assuming tc is a string, not boolean
      formData.append("dob", dob);
      formData.append("profile_picture", profilePicture);
      formData.append("gender", gender);
      formData.append("bio", bio);
      formData.append("age", age);
      formData.append("hobbies", hobbies);
      formData.append("interests", interests);
      formData.append("age_group_min", ageGroupMin);
      formData.append("age_group_max", ageGroupMax);
      formData.append("is_interested_in", isInterestedIn);

      // Check if profilePicture, document, selfie are not null before appending
      if (profilePicture !== null) {
        formData.append("profilePicture", profilePicture);
      }
      if (document !== null) {
        formData.append("document", document);
      }
      if (selfie !== null) {
        formData.append("selfie", selfie);
      }

      if (await register(formData)) {
        toast("Registration form submitted for verification!");
        router.push("/auth/login");
      } else {
        toast("Error registering user");
      }
    }
  };

  return (
    <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                autoComplete="gender"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-2">
              <label
                htmlFor="dob"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                autoComplete="dob"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="profile-picture"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Profile Picture
              </label>
              <input
                id="profile-picture"
                name="profile-picture"
                type="file"
                accept="image/png, image/jpeg"
                required
                onChange={(e) =>
                  setProfilePicture(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="bio"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                autoComplete="bio"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-2">
              <label
                htmlFor="hobbies"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Hobbies
              </label>
              <textarea
                id="hobbies"
                name="hobbies"
                rows={3}
                autoComplete="hobbies"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="dancing,singing"
                value={hobbies}
                onChange={(e) => setHobbies(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-2">
              <label
                htmlFor="interests"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Interests
              </label>
              <textarea
                id="interests"
                name="interests"
                rows={3}
                autoComplete="interests"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="tall,handsome"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-2">
              <label
                htmlFor="document"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Document
              </label>
              <input
                id="document"
                name="document"
                type="file"
                accept="image/png, image/jpeg"
                required
                onChange={(e) =>
                  setDocument(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="selfie"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Selfie
              </label>
              <input
                id="selfie"
                name="selfie"
                type="file"
                accept="image/png, image/jpeg"
                required
                onChange={(e) =>
                  setSelfie(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>
          </div>

          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {/* Age */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-2">
              <label
                htmlFor="age"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                autoComplete="age"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            {/* Minimum Age */}
            <div className="mb-2">
              <label
                htmlFor="age-group-min"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Minimum Age Group
              </label>
              <input
                id="age-group-min"
                name="age-group-min"
                type="number"
                autoComplete="age-group-min"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Minimum Age Group"
                value={ageGroupMin}
                onChange={(e) => setAgeGroupMin(e.target.value)}
              />
            </div>
            {/* Maximum Age */}
            <div className="mb-2">
              <label
                htmlFor="age-group-max"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Maximum Age Group
              </label>
              <input
                id="age-group-max"
                name="age-group-max"
                type="number"
                autoComplete="age-group-max"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Maximum Age Group"
                value={ageGroupMax}
                onChange={(e) => setAgeGroupMax(e.target.value)}
              />
            </div>
            {/* Interested In */}
            <div className="mb-2">
              <label
                htmlFor="is-interested-in"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Interested In
              </label>
              <select
                id="is-interested-in"
                name="is-interested-in"
                autoComplete="is-interested-in"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={isInterestedIn}
                onChange={(e) => setIsInterestedIn(e.target.value)}
              >
                <option value="">Select Interested In</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/auth/login")}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
