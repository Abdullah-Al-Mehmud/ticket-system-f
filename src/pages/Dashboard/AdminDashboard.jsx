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
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [animatedBars, setAnimatedBars] = useState(false);

  // Get data form localStorage
  const user = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : {};

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

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
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "users", label: "Users", icon: Users },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const StatCard = ({ title, value, icon: Icon, change, changeType }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p
              className={`text-sm flex items-center mt-1 ${
                changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}>
              <TrendingUp
                className={`w-4 h-4 mr-1 ${
                  changeType === "negative" ? "rotate-180" : ""
                }`}
              />
              {changeType === "positive" ? "+" : "-"}
              {change}% from last month
            </p>
          )}
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-all duration-300 ease-in-out fixed lg:static inset-y-0 left-0 z-50 ${
          sidebarCollapsed ? "w-16" : "w-64"
        } bg-white shadow-lg`}>
        <div
          className={`flex items-center justify-between h-16 px-6 border-b border-gray-200 ${
            sidebarCollapsed ? "px-4" : "px-6"
          }`}>
          {!sidebarCollapsed && (
            <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
          )}
          <div className="flex items-center space-x-2">
            {/* Collapse/Expand Button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-2 rounded-md hover:bg-gray-100 transition-colors"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
              {sidebarCollapsed ? (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Mobile close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100">
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

              {/* Tooltip for collapsed state */}
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
                className="lg:hidden p-2 rounded-md hover:bg-gray-100">
                <Menu className="w-5 h-5" />
              </button>

              {/* Desktop collapse button (alternative position) */}
              {/* <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex p-2 rounded-md hover:bg-gray-100 transition-colors"
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                )}
              </button> */}

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
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              {/* <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{user.email}</span>
              </div> */}
              <div>{user.email}</div>
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

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Revenue"
              value="$45,231"
              icon={DollarSign}
              change="20.1"
              changeType="positive"
            />
            <StatCard
              title="Total Users"
              value="2,350"
              icon={Users}
              change="4.3"
              changeType="positive"
            />
            <StatCard
              title="Total Orders"
              value="1,234"
              icon={ShoppingCart}
              change="2.1"
              changeType="negative"
            />
            <StatCard
              title="Active Users"
              value="573"
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

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
