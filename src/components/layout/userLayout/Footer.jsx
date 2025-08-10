import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../redux/features/categories/categoriesApiSlice";

const Footer = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery({ count: 4 });

  return (
    <div>
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Tapkori</h4>
              <p className="text-gray-400 mb-4">
                Your premier destination for discovering and booking amazing
                events.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-600 transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-600 transition-all duration-300 hover:scale-110"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-600 transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Events - Dynamic Categories */}
            <div>
              <h5 className="font-semibold mb-4">Events</h5>
              <ul className="space-y-2 text-gray-400">
                {!isLoading && !isError && data?.data?.length > 0 ? (
                  data.data.map((category) => (
                    <li key={category.id}>
                      <Link
                        to="/event"
                        state={{ id: category.id }}
                        className="hover:text-white transition-colors"
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
                        className="hover:text-white transition-colors"
                      >
                        Music
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Sports
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Theatre
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Food & Drink
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to={"/help-center"}
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/contact"}
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/refund-policy"}
                    className="hover:text-white transition-colors"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/terms-of-service"}
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to={"/about"}
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/careers"}
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/press"}
                    className="hover:text-white transition-colors"
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/privacy-policy"}
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} TapKori. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
