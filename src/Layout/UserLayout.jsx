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
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useGetUserTicketsQuery } from "../redux/features/tickets/ticketsApiSlice";

const UserLayout = ({  }) => {
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

  const sidebarItems = [{ id: "dashboard", label: "Dashboard", icon: Home },];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-all duration-300 ease-in-out fixed lg:static inset-y-0 left-0 z-50 ${
          sidebarCollapsed ? "w-16" : "w-64"
        } bg-white shadow-lg`}>
        <div
          className={`flex items-center justify-between h-16 border-b border-gray-200 ${
            sidebarCollapsed ? "px-4" : "px-6"
          }`}>
          {!sidebarCollapsed && (
            <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
          )}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle sidebar width">
              {sidebarCollapsed ? (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              aria-label="Close sidebar">
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
              title={sidebarCollapsed ? item.label : ""}>
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
                aria-label="Open sidebar">
                <Menu className="w-5 h-5" />
              </button>
              {/* <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2> */}
            </div>
            <div className="flex items-center space-x-4">
             
               <div className="text-right">
                <div className="font-medium text-gray-800">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors shadow">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24">
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

          <main className="flex-1 overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
