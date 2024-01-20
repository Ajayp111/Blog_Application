/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BiSolidLike } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { useProvider } from "../contextAPI/context";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
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
    <div className="my-5">
      <div>
        <div className="shad p-5 rounded-lg">
          <p className="text-sm">
            <span>Posted By : </span>
            <span className="font-[500]">{post?.user?.username} </span>
          </p>
          <div className="flex items-center justify-between gap-x-2">
            <h1 className="text-xl font-bold my-2">{post.title}</h1>
            <div>
              {isMine && (
                <div className="flex gap-x-2">
                  <IconButton onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                  <IconButton className="text-red-500" onClick={handleDelete}>
                    <BsTrash size={25} />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
          <p>{post.description}</p>
          <div className="my-2 flex items-center gap-x-5">
            <button onClick={handleLike}>
              {like ? (
                <BiSolidLike size={25} className="text-green-500" />
              ) : (
                <BiSolidLike size={25} />
              )}
            </button>
            <p>{post.likes.length} Peoples liked this</p>
          </div>
          <div className="my-3">
            <form onSubmit={handleComment}>
              <textarea
                type="text"
                className="px-5 py-2 bg-gray-300 my-2 rounded"
                name="comment"
                placeholder="Write a comment"
              />
              <br />
              <input
                type="submit"
                className="cursor-pointer px-5 py-1 bg-green-500 text-white rounded"
                value={"Post comment"}
              />
            </form>
          </div>

          <div>
            <h1>Comments</h1>
            <button className="text-green-500" onClick={toggleComments}>
              {showComments ? "Hide Comments" : "View Comments"}
            </button>
            {showComments && (
              <div className="comments-section max-h-32 overflow-y-auto">
                {post.comments.map((comment) => (
                  <Comment comment={comment} key={comment._id} />
                ))}
              </div>
            )}
          </div>
        </div>

        <Modal
          show={showEditModal}
          onHide={handleCloseEditModal}
          dialogClassName="modal-90w"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit(id, e.target.editpostText.value);
              }}
            >
              <textarea
                type="text"
                className="px-5 py-2 bg-gray-300 my-2 rounded"
                name="editpostText"
                placeholder="Edit your post here"
                defaultValue={editPost?.description}
              />
              <br />
              <button type="submit" style={{ backgroundColor: "008000" }}>
                Save
              </button>
              <Button variant="secondary" onClick={handleCloseEditModal}>
                Cancel
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
