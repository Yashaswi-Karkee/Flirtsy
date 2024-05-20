import axios from "axios";

export const api_url = "http://127.0.0.1:8000/api";
export const origin_url = "http://127.0.0.1:8000";

export const authHeader = (tok: any) => {
  return { Authorization: `Bearer ${tok}` };
};

export const multiPartHeader = { "Content-Type": "multipart/form-data" };

export const jsonHeader = {
  "Content-Type": "application/json",
  "X-CSRFToken":
    "3oyvepfHffl2ia4s9S5cyVXjxh1KgcWe4vn6EtbMRIElHDhKThnVGT61FbEDwHJP",
};

export const login = async (formData: any) => {
  try {
    const response = await axios.post(`${api_url}/user/login/`, formData, {
      headers: jsonHeader,
    });
    console.log(response);
    window.sessionStorage.setItem("token", response.data.token.access);
    window.sessionStorage.setItem("userId", response.data.user_id);
    window.sessionStorage.setItem("email", response.data.user_email);

    const token = window.sessionStorage.getItem("token");

    if (token) {
      const response1 = await getUserInfo();
      const avatar = origin_url + response1.profile_picture;
      window.sessionStorage.setItem("name", response1.name);
      window.sessionStorage.setItem("bio", response1.bio);
      window.sessionStorage.setItem("avatar", avatar);
      window.sessionStorage.setItem("max_age", response1.age_group_max);
      window.sessionStorage.setItem("min_age", response1.age_group_min);
      window.sessionStorage.setItem("interestedIn", response1.is_interested_in);
      window.sessionStorage.setItem("age", response1.age);
      console.log(
        response1.name,
        response1.bio,
        avatar,
        response1.age_group_max,
        response1.age_group_min,
        response1.is_interested_in,
        response1.age
      );
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const logout = async () => {
  let token = window.sessionStorage.getItem("token");
  const response = await axios.get(`${api_url}/user/logout/`, {
    headers: authHeader(token),
  });
  if (response.data.success == "true") {
    window.sessionStorage.clear();
    return true;
  } else {
    return false;
  }
};

export const getUserInfo = async () => {
  let token = window.sessionStorage.getItem("token");
  try {
    const response = await axios.get(`${api_url}/user/profile/`, {
      headers: authHeader(token),
    });
    return response.data;
  } catch (err) {
    return false;
  }
};

export const register = async (formData: any) => {
  try {
    const response = await axios.post(`${api_url}/user/register/`, formData, {
      headers: multiPartHeader,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const passwordResetEmail = async (formData: any) => {
  try {
    const response = await axios.post(
      `${api_url}/user/send-reset-password-email/`,
      formData
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateProfile = async (formData: any) => {
  let token = window.sessionStorage.getItem("token");
  try {
    const response = await axios.put(
      `${api_url}/user/update-profile/`,
      formData,
      {
        headers: {
          ...authHeader(token),
          ...multiPartHeader,
        },
      }
    );
    return true;
  } catch (error) {
    return false;
  }
};

export const updatePassword = async (formData: any) => {
  let token = window.sessionStorage.getItem("token");
  try {
    const response = await axios.put(
      `${api_url}/user/update-password/`,
      formData,
      {
        headers: {
          ...authHeader(token),
          ...jsonHeader,
        },
      }
    );
    console.log(response);
    return true;
  } catch (error) {
    return false;
  }
};

export const passwordReset = async (formData: any, uid: any, token: any) => {
  try {
    const response = await axios.post(
      `${api_url}/user/reset-password/${uid}/${token}/`,
      formData
    );
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
};

export const profileMatcher = async () => {
  let token = window.sessionStorage.getItem("token");
  try {
    const response = await axios.get(`${api_url}/user/matching-profile/`, {
      headers: authHeader(token),
    });
    return response.data;
  } catch (err) {
    return false;
  }
};
