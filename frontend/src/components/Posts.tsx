"use client";

import React, { useState } from "react";
import {likePost, createComment, updateComment, deleteComment, deletePost} from "../api/postsAPI";

const Post = ({ id, user, caption, postPicture, likes, comments }: any) => {

  const [like, setlike] = useState(likes.length);
  const [showcomment, setShowcomment] = useState<boolean>(false);
  const [comment, setcomment] = useState<any[]>([]);
  const [commentText, setCommentText] = useState("");

  const handleLike = (e:any) => {
    e.preventDefault()

    setlike((prevlike:number) => prevlike + 1);
  };

  const handlecommentubmit = (e: any) => {
    e.preventDefault();
    setcomment([...comment, commentText]);
    setCommentText("");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <img
          src={user.profilePicture}
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
          Like ({like})
        </button>
        <button onClick={() => setShowcomment(!showcomment)}>
          {showcomment ? "Hide comment" : "Show comment"}
        </button>
      </div>
      {showcomment && (
        <div className="mb-4">
          <ul>
            {comment.map((comment, index) => (
              <li key={index} className="mb-2">
                {comment}
              </li>
            ))}
          </ul>
          <form onSubmit={handlecommentubmit} className="flex mt-2">
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