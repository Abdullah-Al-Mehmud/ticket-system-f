import React from "react";
import { ArrowLeft } from "lucide-react"; // optional icon from lucide-react
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white px-4">
      <div className="bg-white bg-opacity-10 p-8 rounded-2xl backdrop-blur-md text-center shadow-xl">
        <h1 className="text-6xl text-black font-extrabold mb-4">404</h1>
        <p className="text-xl text-black mb-6">Oops! The page you’re looking for doesn’t exist.</p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center px-4 py-2 bg-white text-purple-700 font-semibold rounded-full shadow hover:bg-purple-100 transition"
        >
          <ArrowLeft className="mr-2" size={18} /> Go back home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
