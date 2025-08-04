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
  Settings,
  Activity,
  Clock,
  MapPin,
} from "lucide-react";
import { useGetUserByIdQuery } from "../../redux/features/user/userApiSlice";
import { Link, useParams } from "react-router-dom";
import PageLoading from "../../components/LoaderComponent/PageLoading";

export default function UserProfilePage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetUserByIdQuery(id);
  const userData = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-gray-500">
          <PageLoading />
        </div>
      </div>
    );
  }

  if (isError || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md border">
          <div className="text-red-500 mb-4">
            <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Profile
          </h3>
          <p className="text-gray-600">
            Unable to load user profile information
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border">
                {userData?.image_url ? (
                  <img
                    src={`${import.meta.env.VITE_IMG_URL}/${
                      userData.image_url
                    }`}
                    alt={userData?.name || "userData Avatar"}
                    className="w-14 h-14 rounded-lg object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/default-image.png";
                    }}
                  />
                ) : (
                  <div
                    className="w-14 h-14 rounded-lg bg-amber-600 text-white flex items-center justify-center font-semibold text-lg uppercase"
                    title={userData?.name || "Unknown userData"}
                    aria-label={`userData avatar placeholder for ${
                      userData?.name || "Unknown"
                    }`}
                  >
                    {userData?.name?.charAt(0) || "?"}
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  {userData.name}
                </h1>
              </div>
            </div>
            <div>
              <Link
                to={`/admin/edit/${id}`}
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Profile Information */}
          <div className="xl:col-span-3">
            <Card className="border border-gray-200">
              <CardHeader className="border-b border-gray-100 bg-gray-50">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        User ID
                      </label>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <Hash className="w-4 h-4 text-gray-400" />
                        <span className="font-mono text-sm text-gray-900">
                          {userData.id}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {userData.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <Shield className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {userData.role}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {userData.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="xl:col-span-1">
            <Card className="border border-gray-200">
              <CardHeader className="border-b border-gray-100 bg-gray-50">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-gray-600" />
                  Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-700">
                      Total Tickets
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      --
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-700">
                      Running Events
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      --
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activity Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-gray-50">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-gray-600" />
                Ticket Purchase History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Ticket className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  No Tickets Yet
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  No ticket purchases found
                </p>
                <p className="text-xs text-gray-400">
                  Purchase history will appear here
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-gray-50">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                Running Events
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  No Active Events
                </h3>
                <p className="text-sm text-gray-500 mb-1">No active events</p>
                <p className="text-xs text-gray-400">
                  Active events will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
