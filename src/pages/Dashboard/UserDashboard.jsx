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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetUserTicketsQuery } from "../../redux/features/tickets/ticketsApiSlice";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { data, isLoading, isError } = useGetUserTicketsQuery();

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
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-all duration-300 ease-in-out fixed lg:static inset-y-0 left-0 z-50 ${
          sidebarCollapsed ? "w-16" : "w-64"
        } bg-white shadow-lg`}
      >
        <div
          className={`flex items-center justify-between h-16 border-b border-gray-200 ${
            sidebarCollapsed ? "px-4" : "px-6"
          }`}
        >
          {!sidebarCollapsed && (
            <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
          )}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle sidebar width"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center ${
                sidebarCollapsed ? "justify-center px-4" : "px-6"
              } py-3 text-left hover:bg-gray-50 transition-colors group relative ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-700"
              }`}
              title={sidebarCollapsed ? item.label : ""}
            >
              <item.icon
                className={`w-5 h-5 ${
                  sidebarCollapsed ? "" : "mr-3"
                } transition-all`}
              />
              {!sidebarCollapsed && (
                <span className="transition-opacity duration-200">
                  {item.label}
                </span>
              )}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                aria-label="Open sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 relative" aria-label="Notifications">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <div>{user.email}</div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors shadow"
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
            </div>
          </div>
        </header>

        {/* Dashboard Table */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <div className="max-h-[500px] overflow-y-auto">
                <table className="w-full min-w-[1000px] divide-y divide-gray-200">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3">Ticket</th>
                      <th className="px-6 py-3">Order Total</th>
                      <th className="px-6 py-3">Booked On</th>
                      <th className="px-6 py-3">Payment</th>
                      <th className="px-6 py-3">Checked In</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Cancel Booking</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Loading */}
                    {isLoading && (
                      <tr>
                        <td
                          colSpan="9"
                          className="text-center py-6 text-gray-500"
                        >
                          Loading...
                        </td>
                      </tr>
                    )}

                    {/* Error */}
                    {isError && (
                      <tr>
                        <td
                          colSpan="9"
                          className="text-center py-6 text-red-500"
                        >
                          Failed to load data.
                        </td>
                      </tr>
                    )}

                    {/* Empty */}
                    {!isLoading &&
                      !isError &&
                      data?.data?.length === 0 && (
                        <tr>
                          <td
                            colSpan="9"
                            className="text-center py-6 text-gray-500"
                          >
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
                              {booking.event?.title || "Untitled Event"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.event?.category_name} |{" "}
                              {booking.event?.location}
                            </div>
                            <div className="text-sm text-green-600 font-medium">
                              Booking ID: {booking.id}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            x {booking.ticket_quantity}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {(
                              booking.ticket_quantity * booking.price_per_ticket
                            ).toFixed(2)}{" "}
                            USD
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {new Date(booking.purchased_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {/* Assuming payment info is in booking.status or add your payment field */}
                            {booking.payment_status || booking.status || "N/A"}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {/* Assuming a boolean checked_in field */}
                            {booking.checked_in ? "Active" : "Inactive"}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {booking.status}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {/* Cancel booking info - adapt if you have such a field */}
                            {booking.cancel_booking || "N/A"}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => setSelectedBooking(booking)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                className="text-green-600 hover:text-green-800 p-1"
                                title="Download"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button
                                className="text-purple-600 hover:text-purple-800 p-1"
                                title="Share"
                              >
                                <Share2 className="w-4 h-4" />
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
    </div>
  );
};

export default UserDashboard;
