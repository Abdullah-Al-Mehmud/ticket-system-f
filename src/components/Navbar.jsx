import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const data = localStorage.getItem("data");

    if (token && data) {
      try {
        const parsedData = JSON.parse(data);
        setUser({
          name: parsedData.name,
          email: parsedData.email,
        });
      } catch (err) {
        console.error("Invalid user data in localStorage", err);
        console.error("Invalid user data in localStorage");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/">
            <h1 className="text-2xl font-bold text-gray-900">
              Tap<span className="text-blue-600">Kori</span>
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to={"/event"}
              className="text-gray-900 hover:text-blue-600 font-medium"
            >
              Events
            </Link>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 font-medium"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 font-medium"
            >
              Venues
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 font-medium"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart icon */}
            {/* <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.293 2.293a1 1 0 001.415 1.414L9 14h6l1.293 2.293a1 1 0 001.415-1.414L17 13M9 21h6m-6 0a1 1 0 01-1-1v-1h8v1a1 1 0 01-1 1m-6 0h6"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </div> */}

            {/* Auth */}
            {!user ? (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            ) : (
              <>
                <div className="text-right">
                  <div className="font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                    />
                  </svg>
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-gray-900 font-medium">
              Events
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-500 hover:text-gray-900"
            >
              Categories
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-500 hover:text-gray-900"
            >
              Venues
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-500 hover:text-gray-900"
            >
              About
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-500 hover:text-gray-900"
            >
              Contact
            </a>

            <div className="px-3 py-2 space-y-2">
              {!user ? (
                <Link
                  to="/login"
                  className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
