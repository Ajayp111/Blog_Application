// EditPost.js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`);
        const data = await res.json();

        if (data.success) {
          setPost(data.post);
        } else {
          console.error("Failed to fetch post details");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post), // Assuming the post state contains the updated data
      });

      const data = await res.json();

      if (data.success) {
        console.log("Post updated successfully");
        // Handle navigation or display success message as needed
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Title</label>
        <input type="text" name="title" defaultValue={post.title} />
        {/* Include other input fields with defaultValue */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPost;
