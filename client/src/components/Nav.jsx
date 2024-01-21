import { toast } from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useProvider } from "../contextAPI/context";
import logo from "../../public/Logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Nav() {
  const userId = JSON.parse(localStorage.getItem("loggedUser"));
  const { forceUpdate } = useProvider();

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    toast.success("Log out Successfully");
    forceUpdate();
  };

  return (
    <>
      <div className="d-flex py-3 px-2 pr-0 px-md-5 justify-content-between align-items-center">
        <span>
          <img src={logo} alt="" width="120px" height="18px" />
        </span>
      </div>
      <nav className="py-6">
        <div className="md:flex md:justify-between p-10 shad rounded-3xl">
          <div>
            <p>
              Logged In User :{" "}
              <span
                className={`text-white px-2 py-1 rounded-3xl font-bold ${
                  userId?.username ? "bg-orange-600" : "bg-red-600"
                }`}
              >
                {userId ? userId?.username : "Not An User"}
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-4 justify-center flex-grow">
            {/* Bootstrap Search Bar */}
            <div className="col-md-6">
              <input
                className="form-control border-orange-500"
                type="text"
                placeholder="Search"
              />
            </div>
            <div className="flex space-x-4"></div>
            <div className="flex space-x-4 lg:space-x-7">
              {userId?.username ? (
                <button
                  className="flex items-center gap-2 text-white bg-red-600 px-4 py-2 rounded-3xl my-3 sm:my-0"
                  onClick={handleLogout}
                >
                  Log Out
                  <span>
                    <FiLogOut />
                  </span>
                </button>
              ) : (
                <button className="px-5 py-2 bg-orange-500 text-white font-bold rounded-lg ml-6 mr-3 m-3 sm:my-0">
                  <Link to="/login">Login</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
