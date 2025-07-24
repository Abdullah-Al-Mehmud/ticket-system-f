import React, { useState } from "react";
import { Menu, X, LogOut, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: "Home", to: "/" },
    { name: "Events", to: "/event" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  const isActiveRoute = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    return path !== "/" && location.pathname.startsWith(path);
  };

  const handleProfileClick = () => {
    if (!user?.role) return;
    if (user.role === "admin") navigate("/admin/dashboard");
    else if (user.role === "organizer") navigate("/organizer/dashboard");
    else navigate("/user/dashboard");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

  return (
    <header className="bg-white/95 backdrop-blur-lg shadow-sm border-b border-amber-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Tap<span className="text-slate-900">Kori</span>
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActiveRoute(item.to)
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "text-slate-600 hover:text-amber-600 hover:bg-amber-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => navigate("/login")}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white  transition-all duration-200 rounded cursor-pointer"
                >
                  Login
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-3 p-2 h-auto hover:bg-amber-50"
                    >
                      <Avatar className="w-8 h-8 border-2 border-amber-200">
                        <AvatarFallback className="bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700 font-semibold text-sm">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <div className="font-medium text-slate-800 text-sm">
                          {user.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {user.email}
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem
                      onClick={handleProfileClick}
                      className="flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                        />
                      </svg>
                      My Tickets
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      Favorites
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-amber-600 hover:bg-amber-50"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-amber-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                  isActiveRoute(item.to)
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "text-slate-600 hover:text-amber-600 hover:bg-amber-50"
                }`}
                onClick={() => setIsMenuOpen(false)} // Close mobile menu when item is clicked
              >
                {item.name}
              </Link>
            ))}

            <div className="px-3 py-4 space-y-3 border-t border-amber-100 mt-4">
              {!user ? (
                <div className="space-y-2">
                  <Button
                    onClick={() => {
                      navigate("/register");
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-amber-200 text-amber-700 hover:bg-amber-50"
                  >
                    Sign Up
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                  >
                    Login
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
                    <Avatar className="w-10 h-10 border-2 border-amber-200">
                      <AvatarFallback className="bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700 font-semibold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-slate-800">
                        {user.name}
                      </div>
                      <div className="text-sm text-slate-500">{user.email}</div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Button
                      onClick={handleProfileClick}
                      variant="ghost"
                      className="w-full justify-start text-slate-600 hover:text-amber-600 hover:bg-amber-50"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-600 hover:text-amber-600 hover:bg-amber-50"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                        />
                      </svg>
                      My Tickets
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-600 hover:text-amber-600 hover:bg-amber-50"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      Favorites
                    </Button>
                  </div>

                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
