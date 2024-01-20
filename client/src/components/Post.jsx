/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BiSolidLike } from "react-icons/bi";
import { useProvider } from "../contextAPI/context";
import { Modal, Button } from "react-bootstrap";
import Comment from "./Comment";

export default function Post({ post }) {
  const [editPost, setEditPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { forceUpdate } = useProvider();
  const userId = JSON.parse(localStorage.getItem("loggedUser"))?.id;

  const handleCloseEditModal = () => {
    setEditPost(null);
    setShowEditModal(false);
  };
  const handleSaveEdit = async (postId, editedPost) => {
    const res = await fetch(
      `https://atgtask.onrender.com/api/posts/${postId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ description: editedPost }),
      }
    );

    const data = await res.json();

    if (data.success) {
      toast.success("Post updated");
      forceUpdate();
      handleCloseEditModal();
    }
  };

  const handleEdit = () => {
    setEditPost(post);
    setShowEditModal(true);
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

    const res = await fetch(`https://atgtask.onrender.com/api/posts/${id}`, {
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

    const res = await fetch(
      `https://atgtask.onrender.com/api/posts/${id}/comment`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }
    );
    const data = await res.json();

    if (data.success) {
      toast.success("comment added successfully");
      forceUpdate();
      e.target.comment.value = "";
    }
  };

  const handleLike = async () => {
    if (!userId) return alert("Please login to like a post");

    const res = await fetch(
      `https://atgtask.onrender.com/api/posts/${id}/like`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      }
    );

    const data = await res.json();

    console.log(data);

    if (data.success) {
      toast.success(data.message);
      forceUpdate();
    }
    setLike((m) => !m);
  };

  return (
    <div className="my-5">
      <div>
        <div className="shadow-lg p-6 rounded-lg border border-gray-200">
          <p className="text-sm">
            <span>Posted By:</span>{" "}
            <span className="font-semibold">{post?.user?.username}</span>
          </p>
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
        <div className="text-center max-h-32 border border-orange-400">
          <Modal
            show={showEditModal}
            onHide={handleCloseEditModal}
            dialogClassName="modal-90w"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title className="text-center">Edit Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveEdit(id, e.target.editpostText.value);
                }}
              >
                <div className="d-flex justify-content-center align-items-center mb-3 text-center">
                  <textarea
                    type="text"
                    className="form-control my-2 border border-spacing-10 border-cyan-900 px-3"
                    name="editpostText"
                    placeholder="Edit your post here"
                    defaultValue={editPost?.description}
                  />
                </div>
                <div className="d-flex justify-content-center text-center pb-8">
                  {" "}
                  <Button
                    type="submit"
                    className="p-2"
                    style={{ backgroundColor: " #4CAF50", color: "#ffffff" }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    className="ml-4"
                    onClick={handleCloseEditModal}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}
