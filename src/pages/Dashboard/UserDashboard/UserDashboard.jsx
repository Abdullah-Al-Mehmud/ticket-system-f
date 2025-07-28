import React, { useState, useEffect } from "react";
import {
  Bell,
  X,
  Menu,
  Search,
  ChevronLeft,
  ChevronRight,
  Home,
  Eye,
  Download,
  Share2,
  ChartBarStacked,
  MapPinCheck,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserTicketsQuery } from "../../../redux/features/tickets/ticketsApiSlice";
// import UserModelForm from "./UserModelTicketForm";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { data, isLoading, isError } = useGetUserTicketsQuery();

  console.log(data);

  const user = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : {};
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    // any animations or effects here if needed
  }, []);

  const sidebarItems = [{ id: "dashboard", label: "Dashboard", icon: Home }];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center -mt-12 relative">
              {/* Profile Image */}
              <div className="relative mb-4 sm:mb-0 sm:mr-6">
                <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-10 h-10 text-gray-500" />
                    </div>
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 shadow-lg transition-colors">
                  <Edit className="w-3 h-3" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                      {user.name || "User Name"}
                    </h1>
                    <p className="text-gray-600 mb-3">
                      {user.role || "Customer"}
                    </p>
                  </div>
                  <button className="self-start sm:self-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Edit Profile
                  </button>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {user.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
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
                        Member since {new Date(user.joinedDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ChartBarStacked className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {data?.data?.length || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPinCheck className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Tickets</p>
                <p className="text-2xl font-bold text-gray-900">
                  {data?.data?.filter(booking => booking.status === 'active')?.length || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {data?.data?.reduce((total, booking) => 
                    total + (booking?.quantity * booking?.ticket_category?.price || 0), 0
                  ).toFixed(2)} ৳
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* {UserModelForm} */}
        {/* Dashboard Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">My Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <div className="max-h-[500px] overflow-y-auto">
              <table className="w-full min-w-[1000px] divide-y divide-gray-200">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3">Ticket Per Price</th>
                    <th className="px-6 py-3">Ticket Quantity</th>
                    <th className="px-6 py-3">Total Cost</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Loading */}
                  {isLoading && (
                    <tr>
                      <td
                        colSpan="9"
                        className="text-center py-6 text-gray-500">
                        Loading...
                      </td>
                    </tr>
                  )}

                  {/* Error */}
                  {isError && (
                    <tr>
                      <td colSpan="9" className="text-center py-6 text-red-500">
                        Failed to load data.
                      </td>
                    </tr>
                  )}

                  {/* Empty */}
                  {!isLoading && !isError && data?.data?.length === 0 && (
                    <tr>
                      <td
                        colSpan="9"
                        className="text-center py-6 text-gray-500">
                        No bookings found.
                      </td>
                    </tr>
                  )}

                  {/* Data Rows */}
                  {!isLoading &&
                    !isError &&
                    data?.data?.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {booking?.ticket_category?.event?.title ||
                              "Untitled Event"}
                          </div>
                      

                          <div className="text-sm text-green-600 font-medium">
                            Booking ID: {booking.id}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {booking?.ticket_category?.price}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          x {booking.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {(
                            booking?.quantity * booking?.ticket_category?.price
                          ).toFixed(2)}{" "}
                          taka
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-900">
                          {booking.status}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/user/user-view-ticket/${booking.id}`}
                              onClick={() => setSelectedBooking(booking)}
                              className="text-blue-600 hover:text-blue-800 p-1"
                              title="View Details">
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              className="text-green-600 hover:text-green-800 p-1"
                              title="Download">
                              <Download className="w-4 h-4" />
                            </button>
                         
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;