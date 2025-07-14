import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Star,
  ChevronRight,
  Menu,
  X,
  Clock,
  Shield,
  Award,
  Zap,
  Search,
} from "lucide-react";

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            <header className="bg-white shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-gray-900">
                              Tap<span className="text-blue-600">Kori</span>
                            </h1>
                          </div>
                        </div>
            
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                          <a
                            href="#"
                            className="text-gray-900 hover:text-blue-600 font-medium transition-colors">
                            Events
                          </a>
                          <a
                            href="#"
                            className="text-gray-500 hover:text-blue-600 font-medium transition-colors">
                            Categories
                          </a>
                          <a
                            href="#"
                            className="text-gray-500 hover:text-blue-600 font-medium transition-colors">
                            Venues
                          </a>
                          <a
                            href="#"
                            className="text-gray-500 hover:text-blue-600 font-medium transition-colors">
                            About
                          </a>
                          <a
                            href="#"
                            className="text-gray-500 hover:text-blue-600 font-medium transition-colors">
                            Contact
                          </a>
                        </nav>
            
                        <div className="hidden md:flex items-center space-x-4">
                          <div className="relative inline-block">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-8 h-8 text-gray-700"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
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
                          </div>
            
                          <Link
                            to="/login"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Login
                          </Link>
                        </div>
            
                        {/* Mobile menu button */}
                        <div className="md:hidden">
                          <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-500 hover:text-gray-700">
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
                            className="block px-3 py-2 text-gray-500 hover:text-gray-900">
                            Categories
                          </a>
                          <a
                            href="#"
                            className="block px-3 py-2 text-gray-500 hover:text-gray-900">
                            Venues
                          </a>
                          <a
                            href="#"
                            className="block px-3 py-2 text-gray-500 hover:text-gray-900">
                            About
                          </a>
                          <a
                            href="#"
                            className="block px-3 py-2 text-gray-500 hover:text-gray-900">
                            Contact
                          </a>
                          <div className="px-3 py-2 space-y-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="lucide lucide-shopping-bag-icon lucide-shopping-bag">
                              <path d="M16 10a4 4 0 0 1-8 0" />
                              <path d="M3.103 6.034h17.794" />
                              <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
                            </svg>
                            <Link
                              to="/register"
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                              Login
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </header>
        </div>
    );
};

export default Navbar;