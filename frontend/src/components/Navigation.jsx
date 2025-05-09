import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <nav className="bg-white shadow p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-blue-600">Liabryggan</Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
          {user ? (
            <>
              <Link to="/saved" className="text-gray-600 hover:text-blue-600">Saved Jobs</Link>
              <Link to="/profile" className="text-gray-600 hover:text-blue-600">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
