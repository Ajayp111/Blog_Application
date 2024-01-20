import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import cse from "../../public/Computer Engineering.png";
import logo from "../../public/Logo.png";
const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      username.trim() === "" ||
      password.trim() === "" ||
      email.trim() === ""
    ) {
      setError("All fields are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const res = await fetch("https://atgtask.onrender.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });
    const data = await res.json();
    if (data.status === "success") {
      toast.success(data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
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
            className="object-cover max-w-full mr-7 py-7 justify-center items-center px-6"
            alt="logo"
          />
        </div>
        <div className="relative">
          <img
            src={cse}
            className="w-full h-64 object-cover max-w-full"
            alt="cse"
          />
        </div>
        <p className="text-center text-lg my-5">
          Already have an account?{" "}
          <RouterLink to="/login" className="text-indigo-500">
            Sign In
          </RouterLink>
        </p>
        <div className="flex justify-center items-center">
          <form onSubmit={handleSignup} className="w-full max-w-md">
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-2 border rounded"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full p-2 border rounded"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white p-2 rounded"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
