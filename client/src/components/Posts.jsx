import { useProvider } from "../contextAPI/context";
import Post from "./Post";

export default function Posts() {
  const {
    state: { posts },
  } = useProvider();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-6 p-2 md:p-6">
        {posts && posts.map((post) => <Post post={post} key={post._id} />)}
      </div>
    </div>
  );
}
