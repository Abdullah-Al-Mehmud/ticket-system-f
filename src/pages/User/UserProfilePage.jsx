import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Hash,
  Shield,
  Ticket,
  Calendar,
  Activity,
  Settings,
  Eye,
} from "lucide-react";
import { useGetUserByIdQuery } from "../../redux/features/user/userApiSlice";
import { Link, useParams } from "react-router-dom";

export default function UserProfilePage() {
  // Demo data - replace with actual API calls
  // const userData = {
  //   id: "USR-2024-001",
  //   name: "Sarah Johnson",
  //   email: "sarah.johnson@company.com",
  //   role: "Senior Developer"
  // };

  const { id } = useParams();
  const { data, isLoading, isError } = useGetUserByIdQuery(id);
  const userData = data?.data;

  console.log(userData);

  const getRoleVariant = (role) => {
    const roleVariants = {
      "Senior Developer": "secondary",
      "Junior Developer": "outline",
      "Team Lead": "secondary",
      Manager: "secondary",
      Admin: "destructive",
    };
    return roleVariants[role] || "outline";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-gray-500">Loading user profile...</div>
      </div>
    );
  }

  if (isError || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-red-500">Error loading user profile</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              User Profile
            </h1>
            <p className="text-gray-600 mt-1">
              Manage user information and view activity
            </p>
          </div>
          <div className="flex gap-2">
            {/* <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <Eye className="w-4 h-4" />
              View Activity
            </button> */}
            <Link
              to={`/admin/edit/${id}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Settings className="w-4 h-4" />
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Information */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200">
              <CardHeader className="border-b border-gray-200 bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">
                      {userData.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      User ID: {userData.id}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid gap-6">
                  {/* Basic Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-gray-400" />
                        <label className="text-sm font-medium text-gray-500">
                          User ID
                        </label>
                      </div>
                      <p className="text-gray-900 font-mono text-sm bg-gray-50 px-3 py-2 rounded border">
                        {userData.id}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-gray-400" />
                        <label className="text-sm font-medium text-gray-500">
                          Role
                        </label>
                      </div>
                      <div>
                        <Badge
                          variant={getRoleVariant(userData.role)}
                          className="font-medium">
                          {userData.role}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <label className="text-sm font-medium text-gray-500">
                          Full Name
                        </label>
                      </div>
                      <p className="text-gray-900">{userData.name}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <label className="text-sm font-medium text-gray-500">
                          Email Address
                        </label>
                      </div>
                      <p className="text-gray-900">{userData.email}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats Sidebar */}
          <div className="space-y-4">
            <Card className="border border-gray-200">
              <CardHeader className="border-b border-gray-200 pb-3">
                <CardTitle className="text-lg text-gray-900">
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge
                    variant="outline"
                    className="text-green-700 border-green-200 bg-green-50">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Tickets</span>
                  <span className="text-sm font-medium text-gray-900">--</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Running Events</span>
                  <span className="text-sm font-medium text-gray-900">--</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Activity</span>
                  <span className="text-sm font-medium text-gray-900">--</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Future Sections - Ticket Purchase History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-gray-400" />
                <CardTitle className="text-lg text-gray-900">
                  Ticket Purchase History
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center text-gray-500 py-8">
                <Ticket className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm">No ticket purchases found</p>
                <p className="text-xs text-gray-400 mt-1">
                  Purchase history will appear here
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Future Sections - Running Events */}
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <CardTitle className="text-lg text-gray-900">
                  Running Events
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center text-gray-500 py-8">
                <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm">No active events</p>
                <p className="text-xs text-gray-400 mt-1">
                  Active events will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Future Sections - Activity Timeline */}
        <Card className="border border-gray-200">
          <CardHeader className="border-b border-gray-200 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-gray-400" />
              <CardTitle className="text-lg text-gray-900">
                Recent Activity
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center text-gray-500 py-8">
              <Activity className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm">No recent activity</p>
              <p className="text-xs text-gray-400 mt-1">
                User activity timeline will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
