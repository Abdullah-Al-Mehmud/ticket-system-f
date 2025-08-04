import React, { useState } from "react";
import { Mail, Phone, Calendar, MapPin, Edit } from "lucide-react";
import UserModelTicketForm from "./TicketManagement/UserModelTicketForm";
import EditUserModal from "./EditUserModal";
import UserOrganizedEventForm from "./EventManagement/UserOrganizedEventForm";
import { useGetUserByIdQuery } from "../../../redux/features/user/userApiSlice";
import PageLoading from "../../../components/LoaderComponent/PageLoading";

const UserDashboard = () => {
  const users = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : {};

  const userId = users?.id;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: userData, isLoading } = useGetUserByIdQuery(userId);
  const user = userData?.data;

  if (isLoading)
    return (
      <p>
        <PageLoading />
      </p>
    );

  const handleEditClick = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Section */}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="px-6 py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              {/* Profile Image */}
              <div className="relative mb-6 sm:mb-0 sm:mr-8">
                <div className="w-28 h-28 rounded-full shadow overflow-hidden">
                  {user.image_url ? (
                    <img
                      src={`${import.meta.env.VITE_IMG_URL}/${user.image_url}`}
                      alt={user.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-3xl font-semibold text-gray-600">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleEditClick}
                  className="absolute bottom-0 right-0 bg-amber-500 hover:bg-amber-600 text-white rounded-full p-1.5 shadow-lg transition-colors"
                >
                  <Edit className="w-3 h-3" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      Hello, {user.name || "User Name"}
                    </h1>

                    {user.email && (
                      <div className="flex items-center text-gray-700">
                        <Mail className="w-4 h-4 mr-3 text-gray-500" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    )}
                    {user.phone && (
                      <div className="flex items-center text-gray-700">
                        <Phone className="w-4 h-4 mr-3 text-gray-500" />
                        <span className="text-sm">{user.phone}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleEditClick}
                    className="self-start sm:self-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-colors mt-4 sm:mt-0"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Card Modal show */}
        <UserModelTicketForm />

        {/* Organized Event Card Modal show */}
        <UserOrganizedEventForm />

        {/* Edit User Modal */}
        <EditUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userId={user.id}
        />
      </div>
    </div>
  );
};

export default UserDashboard;
