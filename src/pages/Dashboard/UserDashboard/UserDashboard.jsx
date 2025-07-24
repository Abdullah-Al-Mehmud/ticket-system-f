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
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserTicketsQuery } from "../../../redux/features/tickets/ticketsApiSlice";

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
                        className="text-center py-6 text-gray-500"
                      >
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
                          <div className="flex flex-col text-sm text-gray-500 gap-1">
                            <div className="flex items-center gap-1">
                              <ChartBarStacked className="w-4 h-4" />
                              <span>{booking.event?.category_name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPinCheck className="w-4 h-4" />
                              <span>{booking.event?.location}</span>
                            </div>
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
                          {booking.status}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/user/user-view-ticket/${booking.id}`}
                              onClick={() => setSelectedBooking(booking)}
                              className="text-blue-600 hover:text-blue-800 p-1"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              className="text-green-600 hover:text-green-800 p-1"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            {/* <button
                                className="text-purple-600 hover:text-purple-800 p-1"
                                title="Share"
                              >
                                <Share2 className="w-4 h-4" />
                              </button> */}
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
