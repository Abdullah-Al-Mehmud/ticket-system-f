import React from "react";
import { Mail, Phone, Calendar, MapPin, Edit } from "lucide-react";
import UserModelTicketForm from "./UserModelTicketForm";

const UserDashboard = () => {
  const user = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : {};
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Section */}
        <div className="bg-amber rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-amber-400 to-amber-600 h-24"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center -mt-12 relative">
              {/* Profile Image */}
              <div className="relative mb-4 sm:mb-0 sm:mr-6">
                <div className="w-24 h-24 rounded-full bg-amber p-1 shadow-lg">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-amber-200 flex items-center justify-center">
                      <span className="text-3xl font-semibold text-amber-600">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </span>
                    </div>
                  )}
                </div>

                <button className="absolute bottom-0 right-0 bg-amber-500 hover:bg-amber-600 text-amber rounded-full p-1.5 shadow-lg transition-colors">
                  <Edit className="w-3 h-3" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white-90 mb-1">
                      {user.name || "User Name"}
                    </h1>
                    <p className="text-black-600 mb-3">
                      {user.role || "Customer"}
                    </p>
                  </div>
                  <button className="self-start sm:self-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Edit Profile
                  </button>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {user.email && (
                    <div className="flex items-center text-amber-600">
                      <Mail className="w-4 h-4 mr-2 text-amber-400" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  )}
                  {user.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">{user.phone}</span>
                    </div>
                  )}
                  {user.address && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">{user.address}</span>
                    </div>
                  )}
                  {user.dateOfBirth && (
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">
                        {new Date(user.dateOfBirth).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {user.joinedDate && (
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">
                        Member since{" "}
                        {new Date(user.joinedDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Ticket Card Modal show */}
        <UserModelTicketForm />
      </div>
    </div>
  );
};

export default UserDashboard;
