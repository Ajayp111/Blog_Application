import { Toaster } from "react-hot-toast";
import CreatePost from "./CreatePost";
import Nav from "./Nav";
import Posts from "./Posts";
import Header from "./Header";

export default function Home() {
  return (
    <div className="p-5 md:px-10 py-10">
      <Toaster />
      <Nav />
      <Header />
      <CreatePost />
      <Posts />
    </div>
  );
}
