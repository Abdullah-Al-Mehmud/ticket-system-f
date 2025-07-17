import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Hash, Shield } from 'lucide-react';
import {useGetUserByIdQuery} from '../../redux/features/user/userApiSlice';
import { useParams } from 'react-router-dom';

export default function UserProfilePage() {
  // Sample user data - in a real app this would come from props or API

   const { id } = useParams();
   const { data, isLoading, isError } = useGetUserByIdQuery(id);
    const userData = data?.data;

    console.log(userData);

//   const userData = {
//     id: "USR-2024-001",
//     name: "Sarah Johnson",
//     email: "sarah.johnson@company.com",
//     role: "Senior Developer"
//   };

  const getRoleBadgeColor = (role) => {
    const roleColors = {
      "Senior Developer": "bg-blue-500",
      "Junior Developer": "bg-green-500",
      "Team Lead": "bg-purple-500",
      "Manager": "bg-orange-500",
      "Admin": "bg-red-500"
    };
    return roleColors[role] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">{userData?.name}</CardTitle>
                <CardDescription className="text-blue-100">
                  User Profile
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8 space-y-6">
            <div className="grid gap-6">
              {/* ID Field */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <Hash className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    User ID
                  </label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {userData?.id}
                  </p>
                </div>
              </div>

              {/* Name Field */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Full Name
                  </label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {userData?.name}
                  </p>
                </div>
              </div>

              {/* Email Field */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Email Address
                  </label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {userData?.email}
                  </p>
                </div>
              </div>

              {/* Role Field */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Role
                  </label>
                  <div className="mt-2">
                    <Badge className={`${getRoleBadgeColor(userData?.role)} text-white px-3 py-1`}>
                      {userData?.role}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Edit Profile
              </button>
              <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors">
                View Activity
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}