import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "FAQ", path: "/faq" },
  { label: "Features", path: "/features" },
  { label: "What is RUG PULL", path: "/rugpull" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#1a1f2b] text-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <img src="/screenshots/logo.jpg" alt="RugPull Logo" className="h-8 w-auto" />
        </div>
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className={`${
                isActive(path)
                  ? "text-cyan-400 font-semibold"
                  : "text-gray-200 hover:text-cyan-300"
              } transition-colors`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Auth Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${username}&background=ccf2f4&color=white`}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-cyan-400 font-semibold">{username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-1.5 rounded-full transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`${
                  isActive("/login")
                    ? "bg-cyan-500"
                    : "bg-cyan-400 hover:bg-cyan-500"
                } text-blue-900 px-4 py-1.5 rounded-full transition`}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className={`${
                  isActive("/signup")
                    ? "bg-cyan-500"
                    : "bg-cyan-400 hover:bg-cyan-500"
                } text-blue-900 px-4 py-1.5 rounded-full transition`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-[#1a1f2b] shadow-md border-t border-gray-600">
          <nav className="flex flex-col px-4 py-3 space-y-2">
            {navLinks.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                className={`${
                  isActive(path)
                    ? "text-cyan-400 font-semibold"
                    : "text-gray-200 hover:text-cyan-300"
                }`}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <hr className="border-gray-600" />
            {isLoggedIn ? (
              <>
                <div className="flex items-center space-x-2 px-2 py-1">
                  <img
                    src={`https://ui-avatars.com/api/?name=${username}&background=0f172a&color=cyan`}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-cyan-400 font-semibold">{username}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`${
                    isActive("/login")
                      ? "text-cyan-400 font-semibold"
                      : "text-gray-200 hover:text-cyan-300"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className={`${
                    isActive("/signup")
                      ? "bg-cyan-500"
                      : "bg-cyan-400 hover:bg-cyan-500"
                  } px-4 py-2 rounded-md text-white`}
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
