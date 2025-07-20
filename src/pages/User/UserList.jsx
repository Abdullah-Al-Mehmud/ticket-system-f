import React, { use, useState, useEffect } from "react";
import {
  User,
  Mail,
  Calendar,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  Shield,
  Crown,
  X,
  ChevronRight,
} from "lucide-react";
import { useGetUserListQuery } from "../../redux/features/user/userApiSlice";
import { useDeleteUserMutation } from "../../redux/features/user/userApiSlice";
import { Link } from "react-router-dom";

const UserList = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const { data, error, isLoading, refetch } = useGetUserListQuery();
  // console.log(data);
  // console.log(data?.total_user);
  const [deleteUser] = useDeleteUserMutation();

  // const filter

  // filter users based on search term and role

  const handleDelete = async (userId) => {
    console.log("Deleting user:", userId);

    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId).unwrap();
        refetch(); // Refetch the user list after deletion
        setSelectedUser(null); // Deselect user after deletion
      } catch (err) {
        console.error("Failed to delete user:", err);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  const usersData = data?.data ?? [];

  // ✅ Fixed filter logic
  const filteredUsers = usersData
    .filter((user) => {
      const nameMatch = user.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const emailMatch = user.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return nameMatch || emailMatch;
    })
    .filter((user) =>
      filterRole === "all" ? true : user.role.name === filterRole
    );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-50 text-red-700 border-red-200";
      case "organizer":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "user":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Crown size={14} className="text-red-600" />;
      case "organizer":
        return <Shield size={14} className="text-blue-600" />;
      case "user":
        return <User size={14} className="text-green-600" />;
      default:
        return <User size={14} className="text-gray-600" />;
    }
  };

  if (isLoading)
    return <p className="p-8 text-center text-gray-600">Loading users...</p>;
  if (error)
    return <p className="p-8 text-center text-red-600">Error loading users.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                User Management
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage and monitor user accounts
              </p>
            </div>
            <Link
              to="/admin/create-user"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 font-medium">
              <Plus size={16} />
              <span>Add User</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Total Users
                </p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {data?.total_users || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <Crown size={20} className="text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Admins
                </p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {usersData?.filter((u) => u.role === "admin").length || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Organizer
                </p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {usersData?.filter((u) => u.role === "organizer").length || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <User size={20} className="text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Users
                </p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {usersData?.filter((u) => u.role === "user").length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Filters */}

      <div className="max-w-7xl   mx-auto px-8 py-6">
        <div className="flex flex-col top-3  md:flex-row gap-5 justify-between items-center">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-500" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>
        </div>
      </div>
      {/* User Table */}

      <div className="max-w-7xl mx-auto px-8 pb-10">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">User</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-left">Created</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <Link to={`/admin/user-profile/${user.id}`}>
                        {" "}
                        <td className="px-6 py-4">
                          #{user.id.toString().padStart(3, "0")}
                        </td>{" "}
                      </Link>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(
                            user.role.name
                          )}`}>
                          {getRoleIcon(user.role.name)}
                          <span className="ml-1 capitalize">
                            {user.role.name}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            to={`/admin/user-profile/${user.id}`}
                            className="text-blue-600 hover:text-blue-800">
                            <Eye size={16} />
                          </Link>
                          <Link
                            to={`/admin/edit/${user.id}`}
                            className="text-green-600 hover:text-green-800">
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Selected User Details */}
      {selectedUser && (
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              User Details
            </h2>
            <button
              onClick={() => setSelectedUser(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1">
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                ID
              </label>
              <p className="text-lg font-semibold text-gray-900">
                #{selectedUser.id.toString().padStart(3, "0")}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Name
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {selectedUser.name}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Email
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {selectedUser.email}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Role
              </label>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(
                  selectedUser.role
                )}`}>
                <span className="mr-1.5">{getRoleIcon(selectedUser.role)}</span>
                {/* {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)} */}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Created
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(selectedUser.created_at)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
