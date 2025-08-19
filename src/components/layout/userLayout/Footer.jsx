import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../store/features/categories/categoriesApiSlice";

const Footer = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery({ count: 4 });

  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-8">
        {/* Grid Layout - Stacks on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-bold mb-4">Tapkori</h4>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your premier destination for discovering and booking amazing events.
            </p>
            <div className="flex justify-center sm:justify-start space-x-6">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-amber-600 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-amber-600 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-amber-600 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Events - Dynamic Categories */}
          <div className="text-center sm:text-left">
            <h5 className="font-semibold mb-4">Events</h5>
            <ul className="space-y-2 text-gray-400">
              {!isLoading && !isError && data?.data?.length > 0 ? (
                data.data.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/event?category=${category.id}`}
                      className="hover:text-white transition-colors duration-200 block"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition-colors duration-200 block"
                    >
                      Music
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition-colors duration-200 block"
                    >
                      Sports
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition-colors duration-200 block"
                    >
                      Theatre
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-white transition-colors duration-200 block"
                    >
                      Food & Drink
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Support */}
          <div className="text-center sm:text-left">
            <h5 className="font-semibold mb-4">Support</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/help-center"
                  className="hover:text-white transition-colors duration-200 block"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors duration-200 block"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="hover:text-white transition-colors duration-200 block"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="hover:text-white transition-colors duration-200 block"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="text-center sm:text-left">
            <h5 className="font-semibold mb-4">Company</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors duration-200 block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-white transition-colors duration-200 block"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/press"
                  className="hover:text-white transition-colors duration-200 block"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white transition-colors duration-200 block"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-10 pt-8">
          <p className="text-gray-400 text-center text-sm">
            &copy; {new Date().getFullYear()} TapKori. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;