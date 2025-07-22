import React, { useEffect } from "react";

const OrganizerDashboard = () => {
  useEffect(() => {
    setTimeout(() => setAnimatedBars(true), 500);
  }, []);

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
        <h1>Organizer Dashboard</h1>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
