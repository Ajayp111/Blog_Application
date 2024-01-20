import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Reset from "./components/Reset";
import Signup from "./components/Signup";
import EditPost from "./components/editPost";

export default function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Login />} path="/login" />
      <Route element={<Signup />} path="/signup" />
      <Route element={<Profile />} path="/profile" />
      <Route element={<EditPost />} path="/edit/:id" />
      <Route element={<Reset />} path="/reset" />
    </Routes>
  );
}
