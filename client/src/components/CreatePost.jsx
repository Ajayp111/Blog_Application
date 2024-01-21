import { useState } from "react";
import { toast } from "react-hot-toast";
import { useProvider } from "../contextAPI/context";

const CreatePost = () => {
  const userId = JSON.parse(localStorage.getItem("loggedUser"))?.id;
  const { forceUpdate } = useProvider();

  // State for handling image upload
  const [image, setImage] = useState({
    file: null,
    preview: null,
  });

  // Function to handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Update the state with the selected file and its preview
    setImage({
      file: selectedFile,
      preview: URL.createObjectURL(selectedFile),
    });
  };

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

    const post = {
      title: e.target.title.value,
      description: e.target.description.value,
      likes: [],
      comments: [],
      user: userId,
    };

    // Check if an image is selected
    if (image.file) {
      const formData = new FormData();
      formData.append("file", image.file);

      try {
        // Upload the image to the server
        const uploadRes = await fetch(
          "https://atgtask.onrender.com/api/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadData = await uploadRes.json();

        if (uploadData.success) {
          // Attach the image URL to the post data
          post.image = uploadData.imageUrl;
        } else {
          toast.error("Error uploading the image");
          return;
        }
      } catch (error) {
        console.error("Error uploading the image:", error);
        toast.error("Error uploading the image");
        return;
      }
    }

    const res = await fetch(`https://atgtask.onrender.com/api/posts`, {
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
      // Clear the image state after successful post creation
      setImage({
        file: null,
        preview: null,
      });
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
            type="file"
            name="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          {image.preview && (
            <img src={image.preview} width="100" height="100" alt="Preview" />
          )}
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
