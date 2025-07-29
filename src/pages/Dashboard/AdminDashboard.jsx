import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  Bell,
  Search,
  TrendingUp,
  DollarSign,
  Package,
  UserCheck,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useGetDashboardQuery } from "../../redux/features/user/userApiSlice";

const AdminDashboard = () => {
  // fetch dashboard data
  const { data, isLoading, isError, error } = useGetDashboardQuery();

  console.log(data?.data.users.total);

  useEffect(() => {
    setTimeout(() => setAnimatedBars(true), 500);
  }, []);

  // const sidebarItems = [
  //   { id: "dashboard", label: "Dashboard", icon: Home, path: "/admin/dashboard" },
  //   { id: "users", label: "Users", icon: Users, path: "/admin/user-list" },
  //   { id: "catagories", label: "Categories", icon: Package, path: "/admin/categories" },
  // ];

  const StatCard = ({ title, value, icon: Icon, change, changeType }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Users"
              value={data?.data?.users?.total}
              icon={Users}
              change="4.3"
              changeType="positive"
            />
            <StatCard
              title="Total Admin"
              value={data?.data?.users.admins}
              icon={ShoppingCart}
              change="2.1"
              changeType="negative"
            />
            <StatCard
              title="Total Organizer"
              value={data?.data?.users.organizers}
              icon={UserCheck}
              change="8.2"
              changeType="positive"
            />
            <StatCard
              title="Users"
              value={data?.data?.users.users}
              icon={UserCheck}
              change="8.2"
              changeType="positive"
            />
          </div>

          {/* Recent Activity */}
          {/* <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Activity
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  {
                    user: "John Doe",
                    action: "completed an order",
                    time: "2 minutes ago",
                    status: "success",
                  },
                  {
                    user: "Jane Smith",
                    action: "registered as new user",
                    time: "5 minutes ago",
                    status: "info",
                  },
                  {
                    user: "Mike Johnson",
                    action: "updated profile",
                    time: "10 minutes ago",
                    status: "warning",
                  },
                  {
                    user: "Sarah Wilson",
                    action: "left a review",
                    time: "15 minutes ago",
                    status: "success",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-4 ${
                          activity.status === "success"
                            ? "bg-green-500"
                            : activity.status === "info"
                            ? "bg-blue-500"
                            : activity.status === "warning"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}></div>
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium">
                          {activity.user.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {activity.user}
                        </p>
                        <p className="text-sm text-gray-500">
                          {activity.action}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
