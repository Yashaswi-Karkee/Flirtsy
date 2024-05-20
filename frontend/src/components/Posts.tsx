"use client";

import React, { useState, useEffect } from "react";
import {
  likePost,
  createComment,
  updateComment,
  deleteComment,
  likeCheck,
  fetchComments,
} from "../api/postsAPI";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { origin_url } from "@/api/authenticationAPI";
import { getSessionItems } from "@/utils/getSessionItems";
const session = getSessionItems();
const user_id = session.userId;


const Post = ({ id, user, caption, postPicture, likes_count }: any) => {
  console.log(id, user, caption, postPicture, likes_count)
  const [likeCount, setLikeCount] = useState(likes_count);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState<string>("");
  const [updateCommentText, setUpdateCommentText] = useState<string>("");
  const [postComments, setPostComments] = useState<any>([]);
  const [updateCommentId, setUpdateCommentId] = useState<number | null>(null);

  const handleShowUpdateComment = (commentId: number) => {
    setUpdateCommentId(commentId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await likeCheck(id);
        console.log(response)
        setLiked(response.result);
        setLikeCount(response.total_likes);
        console.log(liked,likeCount)
      } catch (error) {
        console.error("Error fetching like status:", error);
      }

      try {
        const comments = await fetchComments(id);
        setPostComments(comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleLike = async () => {
    try {
      if (!liked) {
        await likePost(id);
        setLikeCount((prevCount: any) => prevCount + 1);
      } else {
        await likePost(id);
        setLikeCount((prevCount: any) => prevCount - 1);
      }
      setLiked((prevLiked) => !prevLiked); // Update liked state immediately
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", commentText);
    try {
      const newComment = await createComment(id, formData);
      setPostComments([...postComments, newComment]);
      setCommentText("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleUpdateComment = async (
    commentId: number,
    updatedText: string
  ) => {
    const formData = new FormData();
    formData.append("comment", updatedText);
    try {
      await updateComment(commentId, formData);
      const updatedComments = postComments.map((comment: any) =>
        comment.id === commentId
          ? { ...comment, comment: updatedText }
          : comment
      );
      setPostComments(updatedComments);
      setUpdateCommentId(null);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      const updatedComments = postComments.filter(
        (comment: any) => comment.id !== commentId
      );
      setPostComments(updatedComments);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <img
          src={user.profile_picture}
          alt="Profile"
          className="w-8 h-8 rounded-full mr-2"
        />
        <p className="font-semibold">{user.name}</p>
      </div>
      <p className="mb-4">{caption}</p>
      <img
        src={postPicture}
        alt="Post"
        className="mb-4 border-2"
        style={{ height: 300, width: 600 }}
      />
      <div className="flex items-center mb-4">
        <button onClick={handleLike} className="mr-4">
          {liked ? "Unlike" : "Like"} ({likeCount})
        </button>
        <button onClick={() => setShowComments(!showComments)}>
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
      </div>
      {showComments && (
        <div className="mb-4">
          {postComments.length === 0 ? (
            <p>No comments</p>
          ) : (
            <ul>
              {postComments.map((comment: any) => (
                <li key={comment.id} className="mb-2">
                  <div className="flex items-center mb-1">
                    <img
                      src={origin_url + comment.user.profile_picture}
                      alt="Profile"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <p className="font-semibold">{comment.user.name}</p>
                  </div>
                  {comment.comment}
                  {console.log(comment.user.id, user_id)}
                  {comment.user.id == user_id &&
                  updateCommentId == comment.id ? (
                    <div className="flex space-x-4 mb-1">
                      <input
                        type="text"
                        value={updateCommentText}
                        onChange={(e) => setUpdateCommentText(e.target.value)}
                        className="border rounded-md p-2 mr-2"
                        placeholder="Enter updated comment"
                      />
                      <button
                        onClick={() =>
                          handleUpdateComment(comment.id, updateCommentText)
                        }
                        className="flex items-center text-gray-500 hover:text-gray-700"
                      >
                        <FaPencilAlt className="h-5 w-5 mr-1" /> Update
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-4 mb-1">
                      <button
                        onClick={() => handleShowUpdateComment(comment.id)}
                        className="flex items-center text-gray-500 hover:text-gray-700"
                      >
                        <FaPencilAlt className="h-5 w-5 mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="flex items-center text-gray-500 hover:text-gray-700"
                      >
                        <FaTrash className="h-5 w-5 mr-1 text-red-500" /> Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={handleCommentSubmit} className="flex mt-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="border rounded-l-md p-2 flex-1"
              placeholder="Add a comment..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 rounded-r-md"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
