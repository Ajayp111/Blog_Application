import { useState } from "react";
import { toast } from "react-hot-toast";
import { useProvider } from "../contextAPI/context";
import axios from "axios"; // Make sure to import axios

const CreatePost = () => {
  const userId = JSON.parse(localStorage.getItem("loggedUser"))?.id;
  const { forceUpdate } = useProvider();

  // State for handling image upload
  const [file, setFile] = useState(null);

  // Function to handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Function to handle form submission with image upload
  // Function to handle form submission with image upload
  const createPost = async (e) => {
    e.preventDefault();

    if (!userId) {
      return alert("Please login to create a post");
    }

    if (e.target.title.value === "" || e.target.description.value === "") {
      toast.error("Please fill all the fields");
      return;
    }

    // Construct the post object
    const post = {
      title: e.target.title.value,
      description: e.target.description.value,
      likes: [],
      comments: [],
      user: userId,
    };

    // Handle image upload
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      try {
        // Send image upload request
        const imgUpload = await axios.post(
          "http://localhost:5000/api/posts/image",
          data
        );
        console.log(imgUpload.data);
        console.log("image part is done");
      } catch (err) {
        console.log("img upload error", err);
        toast.error("Failed to upload image");
        return;
      }
    }

    try {
      // Send request to create post
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Post added successfully");
        forceUpdate();
        e.target.title.value = "";
        e.target.description.value = "";
        setFile(null);
      } else {
        toast.error("Failed to create post");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create post");
    }
  };

  return (
    <div className="my-5 shadow rounded-xl">
      <div className="p-5">
        <h1 className="text-2xl py-3 text-orange-500 font-bold text-center mb-5 border border-orange-500 rounded-md">
          Create New Post
        </h1>
        <form onSubmit={createPost}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="border rounded w-full p-2 mb-4"
          />
          <textarea
            placeholder="Description"
            name="description"
            rows={4}
            className="border rounded w-full p-2 mb-4"
          ></textarea>
          <input
            onChange={(e) => handleFileChange(e)}
            type="file"
            className="px-4"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white rounded-full py-2 px-4 w-full cursor-pointer"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
