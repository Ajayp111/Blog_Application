import { Toaster } from "react-hot-toast";
import CreatePost from "./CreatePost";
import Nav from "./Nav";
import Posts from "./Posts";
// import Header from "./Header";
import ImageCarousel from "./ImageCarousel";

export default function Home() {
  return (
    <div className="p-2 md:px-8 py-2">
      <Toaster />
      <Nav />
      <ImageCarousel />
      {/* <Header /> */}
      <CreatePost />
      <Posts />
    </div>
  );
}
