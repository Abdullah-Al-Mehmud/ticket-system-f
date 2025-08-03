import React from "react";
import { Users, UserCheck, Crown } from "lucide-react";
import { useGetDashboardQuery } from "../../redux/features/user/userApiSlice";

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white rounded-lg p-6 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-amber-600">{title}</p>
        <p className="text-2xl font-bold text-amber-900">{value ?? "—"}</p>
      </div>
      <div className="p-3 bg-amber-50 rounded-full">
        <Icon className="w-6 h-6 text-amber-600" />
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { data } = useGetDashboardQuery();
  const stats = data?.data?.users || {};

  return (
    <div className="flex ">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Users" value={stats.total} icon={Users} />
            <StatCard title="Total Admin" value={stats.admins} icon={Crown} />
            <StatCard title="Users" value={stats.users} icon={UserCheck} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
