import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useProvider } from "../contextAPI/context";
import cse from "../../public/Computer Engineering.png";
import logo from "../../public/Logo.png";
export default function Login() {
  const navigate = useNavigate();
  const { setLoggedUser } = useProvider();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setError("All fields are required");
      return;
    }

    const res = await fetch("https://atgtask.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("loginToken", data.token);
      localStorage.setItem("loggedUser", JSON.stringify(data.data));
      setLoggedUser(data.data);
      toast.success("Login Successful navigating to the home page");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error("Invalid Credentials");
      setError(data.message);
    }
  };

  return (
    <>
      <div className="container mx-auto ">
        <Toaster />
        {error && <p className="text-red-600 text-center mb-5">{error}</p>}
        <div>
          <img
            src={logo}
            className="object-cover mr-7 py-7 justify-center items-center px-6"
            alt="logo"
          />
        </div>
        <div className="relative">
          <img src={cse} className="w-full h-64 object-cover" alt="cse" />
        </div>
        <p className="text-center text-lg my-5">
          Do not have an account ?
          <span className="bg-orange-500 text-white ml-2 px-2 py-1 border rounded ">
            <RouterLink to="/signup"> Register</RouterLink>
          </span>
        </p>

        <div className="flex justify-center items-center">
          <form className="shadow p-10 rounded-lg" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 mb-4 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-orange-500 text-white p-2 rounded"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>

        <p className="text-center text-lg my-5">
          Forgot Password ?
          <span className="bg-red-600 text-white ml-2 px-2 py-1 border rounded">
            <RouterLink to="/reset"> Reset</RouterLink>
          </span>
        </p>
      </div>
    </>
  );
}
