import axios from "axios";
import {
  origin_url,
  api_url,
  jsonHeader,
  authHeader,
  multiPartHeader,
} from "@/api/authenticationAPI";

const body = {};

export const getAllPosts = async () => {
  let token = window.sessionStorage.getItem("token");
  try {
    const response = await axios.get(`${api_url}/posts/show-posts/`, {
      headers: authHeader(token),
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getSinglePost = async (id: number) => {
  let token = window.sessionStorage.getItem("token");
  try {
    const response = await axios.get(
      `${api_url}/posts/show-single-post/${id}`,
      {
        headers: authHeader(token),
      }
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getUserPosts = async () => {
  let token = window.sessionStorage.getItem("token");
  try {
    const response = await axios.get(`${api_url}/posts/show-post-user/`, {
      headers: authHeader(token),
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const createPost = async (postData: any) => {
  let token = window.sessionStorage.getItem("token");
  console.log(postData);
  try {
    const response = await axios.post(
      `${api_url}/posts/create-post/`,
      postData,
      {
        headers: {
          ...authHeader(token),
          ...multiPartHeader,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    return null;
  }
};

export const updatePost = async (postId: number, formData: any) => {
  let token = window.sessionStorage.getItem("token");
  try {
    const response = await axios.put(
      `${api_url}/posts/update-post/${postId}/`,
      formData,
      { 
        headers: {
           ...authHeader(token), 
           ...multiPartHeader
       }
       }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    return null;
  }
};

export const deletePost = async (postId: number) => {
  let token = window.sessionStorage.getItem("token");
  try {
    const response = await axios.delete(
      `${api_url}/posts/delete-post/${postId}/`,
      { headers: authHeader(token) }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    return null;
  }
};

export const likePost = async (postId: number) => {
  try {
    let tok = window.sessionStorage.getItem("token");
    const response = await axios.post(
      `${api_url}/posts/like/${postId}/`,
      body,
      {
        headers: {
          ...authHeader(tok),
          ...jsonHeader,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error liking post:", error);
    return null;
  }
};

export const likeCheck = async (postId: number) => {
  let token = window.sessionStorage.getItem("token");
  try {
    const response = await axios.get(`${api_url}/posts/like-check/${postId}/`, {
      headers: authHeader(token),
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    // console.error("Error checking post:", error);
    return null;
  }
};

export const createComment = async (postId: number, commentData: any) => {
  let token = window.sessionStorage.getItem("token");
  try {
    const response = await axios.post(
      `${api_url}/posts/create-comment/${postId}/`,
      commentData,
      { headers: authHeader(token) }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    return null;
  }
};

export const updateComment = async (
  commentId: number,
  updatedCommentData: any
) => {
  let token = window.sessionStorage.getItem("token");
  try {
    const response = await axios.put(
      `${api_url}/posts/update-comment/${commentId}/`,
      updatedCommentData,
      { headers: authHeader(token) }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    return null;
  }
};

export const deleteComment = async (commentId: number) => {
  let token = window.sessionStorage.getItem("token");
  try {
    const response = await axios.delete(
      `${api_url}/posts/delete-comment/${commentId}/`,
      { headers: authHeader(token) }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    return null;
  }
};

export const fetchComments = async (postId: number) => {
  let token = window.sessionStorage.getItem("token");
  try {
    const response = await axios.get(
      `${api_url}/posts/show-comment/${postId}/`,
      { headers: authHeader(token) }
    );
    return response.data;
  } catch (error) {
    console.error("Error showing comments:", error);
    return null;
  }
};
