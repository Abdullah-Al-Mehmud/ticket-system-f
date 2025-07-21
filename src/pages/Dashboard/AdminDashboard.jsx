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
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [animatedBars, setAnimatedBars] = useState(false);

  // fetch dashboard data
   const {data,isLoading,isError,error} = useGetDashboardQuery();
  
   console.log(data?.data.users.total);

  // Get data form localStorage
  const user = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : {};

  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, []);

  const handleLogout = () => {
    localStorage.clear("token");
    navigate("/login");
  };

  // Sample data
  const salesData = [
    { month: "Jan", sales: 4000, percentage: 65 },
    { month: "Feb", sales: 3000, percentage: 48 },
    { month: "Mar", sales: 2000, percentage: 32 },
    { month: "Apr", sales: 2780, percentage: 45 },
    { month: "May", sales: 1890, percentage: 30 },
    { month: "Jun", sales: 2390, percentage: 38 },
  ];

  const pieData = [
    { name: "Desktop", value: 45, color: "bg-blue-500" },
    { name: "Mobile", value: 30, color: "bg-green-500" },
    { name: "Tablet", value: 20, color: "bg-yellow-500" },
    { name: "Other", value: 5, color: "bg-red-500" },
  ];

  const lineData = [
    { month: "Jan", value: 40 },
    { month: "Feb", value: 25 },
    { month: "Mar", value: 65 },
    { month: "Apr", value: 45 },
    { month: "May", value: 75 },
    { month: "Jun", value: 55 },
  ];

  useEffect(() => {
    setTimeout(() => setAnimatedBars(true), 500);
  }, []);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/admin/dashboard" },
    { id: "users", label: "Users", icon: Users, path: "/admin/user-list" },
    { id: "catagories", label: "Categories", icon: Package, path: "/admin/categories" },
  ];

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

  const CustomBarChart = ({ data, title }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>
      <div className="flex items-end justify-between h-64 gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-gray-200 rounded-t-lg relative overflow-hidden"
              style={{ height: "200px" }}>
              <div
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out ${
                  animatedBars ? "" : "h-0"
                }`}
                style={{
                  height: animatedBars ? `${item.percentage}%` : "0%",
                  transitionDelay: `${index * 100}ms`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {item.sales}
                </span>
              </div>
            </div>
            <span className="text-sm text-gray-600 mt-2">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const CustomLineChart = ({ data, title }) => {
    const maxValue = Math.max(...data.map((d) => d.value));

    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>
        <div className="relative h-64">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            {/* Grid lines */}
            <defs>
              <pattern
                id="grid"
                width="40"
                height="20"
                patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 20"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Line path */}
            <path
              d={`M ${data
                .map(
                  (point, index) =>
                    `${index * 60 + 20} ${200 - (point.value / maxValue) * 160}`
                )
                .join(" L ")}`}
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            />

            {/* Data points */}
            {data.map((point, index) => (
              <circle
                key={index}
                cx={index * 60 + 20}
                cy={200 - (point.value / maxValue) * 160}
                r="4"
                fill="#10b981"
                className="hover:r-6 transition-all"
              />
            ))}
          </svg>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
            {data.map((point, index) => (
              <span key={index} className="text-xs text-gray-500">
                {point.month}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const CustomPieChart = ({ data, title }) => {
    let cumulativePercentage = 0;

    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="80"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              {data.map((segment, index) => {
                const strokeDasharray = `${
                  (segment.value / 100) * 502.4
                } 502.4`;
                const strokeDashoffset = -cumulativePercentage * 5.024;
                cumulativePercentage += segment.value;

                return (
                  <circle
                    key={index}
                    cx="96"
                    cy="96"
                    r="80"
                    fill="none"
                    stroke={segment.color
                      .replace("bg-", "#")
                      .replace("-500", "")}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-500 hover:stroke-8"
                    style={{
                      stroke:
                        segment.color === "bg-blue-500"
                          ? "#3b82f6"
                          : segment.color === "bg-green-500"
                          ? "#10b981"
                          : segment.color === "bg-yellow-500"
                          ? "#f59e0b"
                          : "#ef4444",
                    }}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {data.map((segment, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-4 h-4 rounded-full mr-2 ${segment.color}`}></div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {segment.name}
                </div>
                <div className="text-xs text-gray-500">{segment.value}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ProgressBar = ({ label, value, color = "bg-blue-500" }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: animatedBars ? `${value}%` : "0%" }}></div>
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
            {/* <StatCard
              title="Total Revenue"
              value="$45,231"
              icon={DollarSign}
              change="20.1"
              changeType="positive"
            /> */}
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

          {/* Charts Grid */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <CustomBarChart data={salesData} title="Sales Overview" />
            <CustomLineChart data={lineData} title="Revenue Trend" />
          </div> */}

            {/* Performance Metrics */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <CustomPieChart data={pieData} title="Traffic Sources" />

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Performance Metrics
              </h3>
              <ProgressBar
                label="Server Performance"
                value={85}
                color="bg-green-500"
              />
              <ProgressBar
                label="Database Load"
                value={72}
                color="bg-yellow-500"
              />
              <ProgressBar
                label="Network Usage"
                value={58}
                color="bg-blue-500"
              />
              <ProgressBar label="Memory Usage" value={91} color="bg-red-500" />
            </div>
          </div> */}

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
