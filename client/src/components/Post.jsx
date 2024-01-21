/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BiSolidLike } from "react-icons/bi";
import { useProvider } from "../contextAPI/context";
import Comment from "./Comment";
import EditPostModal from "./editPostModel";
export default function Post({ post }) {
  const [editPost, setEditPost] = useState(null);
  const { forceUpdate } = useProvider();
  const userId = JSON.parse(localStorage.getItem("loggedUser"))?.id;

  const handleCloseEditModal = () => {
    setEditPost(null);
  };

  const handleSaveEdit = async (postId, editedPost) => {
    const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ description: editedPost }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Post updated");
      forceUpdate();
      handleCloseEditModal();
    }
  };

  const handleEdit = () => {
    setEditPost(post);
    // setShowEditModal(true);
  };
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const isMine = post.user._id === userId;

  const isLiked = post.likes.some((p) => p._id === userId);

  const [like, setLike] = useState(isLiked);

  const id = post._id;

  const handleDelete = async () => {
    if (!isMine) return alert("You can't delete this post");

    const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    if (data.success) {
      toast.success("Post deleted successfully");
      forceUpdate();
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (!userId) return alert("Please login to comment");

    const comment = {
      text: e.target.comment.value,
      userId: userId,
    };

    const res = await fetch(`http://localhost:5000/api/posts/${id}/comment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    const data = await res.json();

    if (data.success) {
      toast.success("comment added successfully");
      forceUpdate();
      e.target.comment.value = "";
    }
  };

  const handleLike = async () => {
    if (!userId) return alert("Please login to like a post");

    const res = await fetch(`http://localhost:5000/api/posts/${id}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });

    const data = await res.json();

    console.log(data);

    if (data.success) {
      toast.success(data.message);
      forceUpdate();
    }
    setLike((m) => !m);
  };

  return (
    <div className="my-2">
      <div>
        <div className="shadow-lg p-6 rounded-lg border border-gray-200">
          <p className="text-sm">
            <span>Posted By:</span>{" "}
            <span className="font-semibold">{post?.user?.username}</span>
          </p>

          {/* Display the image if it exists */}
          {post.image && (
            <img
              src={`http://localhost:5000/api/posts/${post.image}`}
              alt="Post Image"
              className="my-2 rounded-lg"
            />
          )}

          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold my-2">{post.title}</h1>
            <div>
              {isMine && (
                <div className="flex gap-4">
                  <button
                    className="text-orange-500 hover:underline"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-700">{post.description}</p>
          <div className="my-4 flex items-center gap-4">
            <button onClick={handleLike} className="flex items-center">
              {like ? (
                <BiSolidLike size={25} className="text-orange-500" />
              ) : (
                <BiSolidLike size={25} />
              )}
              <span className="ml-2">{post.likes.length}</span>
            </button>
          </div>
          <div className="my-3">
            <form onSubmit={handleComment}>
              <textarea
                type="text"
                className="w-full px-4 py-2 bg-gray-100 my-2 rounded"
                name="comment"
                placeholder="Write a comment"
              />
              <br />
              <input
                type="submit"
                className="cursor-pointer px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                value="Post comment"
              />
            </form>
          </div>

          <div>
            <h1 className="text-lg font-semibold">Comments</h1>
            <button
              className="text-orange-500 hover:underline"
              onClick={toggleComments}
            >
              {showComments ? "Hide Comments" : "View Comments"}
            </button>
            {showComments && (
              <div className="max-h-32 overflow-y-auto">
                {post.comments.map((comment) => (
                  <Comment comment={comment} key={comment._id} />
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          style={{ margin: "10px", marginBottom: "10px" }}
          className="border border-orange-400"
        >
          <EditPostModal
            editPost={editPost}
            handleSaveEdit={handleSaveEdit}
            handleCloseEditModal={handleCloseEditModal}
          />
        </div>
      </div>
    </div>
  );
}
