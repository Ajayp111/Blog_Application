import { toast } from "react-hot-toast";
import { useProvider } from "../contextAPI/context";

export default function CreatePost() {
  const userId = JSON.parse(localStorage.getItem("loggedUser"))?.id;
  const { forceUpdate } = useProvider();

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
    }
  };

  return (
    <div className="my-5 shadow rounded-xl ">
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
}
