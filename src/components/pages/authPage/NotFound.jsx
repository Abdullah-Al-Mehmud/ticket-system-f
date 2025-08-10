import React from "react";
import { ArrowLeft, Home, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
            <Search className="w-16 h-16 text-amber-600" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Sorry, we couldn't find the page you're looking for.
            The page might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-amber-600 text-white py-3 px-6 rounded-md font-medium hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full bg-white text-gray-700 py-3 px-6 rounded-md font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <a
              href="/contact"
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
