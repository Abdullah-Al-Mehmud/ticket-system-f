import React, { useState } from "react";
import { User, Plus, Edit, Trash2, Eye, Shield, Crown } from "lucide-react";
import {
  useDeleteUserMutation,
  useGetUserListQuery,
} from "../../redux/features/user/userApiSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/ConfirmModel/ConfirmModal";
import TableRowSkeleton from "../../components/LoaderComponent/TableRowSkeleton";
import AdminDashboard from "../../pages/Dashboard/AdminDashboard";

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [userToDelete, setUserToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [configPage, setConfigPage] = useState({
    page: 1,
    count: 3,
    search: "",
    role: "",
    all: true,
  });
  const { data, isError, isLoading } = useGetUserListQuery(configPage);
  const [deleteUser] = useDeleteUserMutation();

  const users = data?.data ?? [];

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      const res = await deleteUser(userToDelete).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error("Failed to delete user.");
      console.error(err);
    }
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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

  if (isError)
    return <p className="p-8 text-center text-red-600">Error loading users.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
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
            className="bg-amber-600 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded transition duration-300 flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Add User</span>
          </Link>
        </div>
      </div>

      <AdminDashboard />

      <div className="max-w-7xl mx-auto px-8 mb-6">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full relative flex gap-2">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={() =>
                  setConfigPage((prev) => ({
                    ...prev,
                    search: searchTerm,
                  }))
                }
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Search
              </button>
            </div>

            <div className="w-full sm:w-48">
              <select
                value={filterRole}
                onChange={(e) => {
                  const selectedRole = e.target.value;
                  setFilterRole(selectedRole);
                  setConfigPage((prev) => ({
                    ...prev,
                    role: selectedRole,
                    page: 1,
                  }));
                }}
                className="w-full px-4 py-3 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>
      </div>

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
                {isLoading ? (
                  <TableRowSkeleton count={4} />
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No users found.
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setFilterRole("");
                          setConfigPage({
                            page: 1,
                            count: 3,
                            search: "",
                            role: "",
                            all: true,
                          });
                        }}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
                      >
                        Clear Filters
                      </button>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <Link
                          className="hover:underline"
                          to={`/admin/user-profile/${user.id}`}
                        >
                          #{user.id.toString().padStart(3, "0")}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          className="hover:underline"
                          to={`/admin/user-profile/${user.id}`}
                        >
                          {user.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(
                            user.role.name
                          )}`}
                        >
                          {getRoleIcon(user.role.name)}
                          <span className="ml-1 capitalize">
                            {user.role.name}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/admin/user-profile/${user.id}`}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            to={`/admin/edit/${user.id}`}
                            className="text-green-600 hover:text-green-800 hover:bg-green-50 p-1 rounded"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(user.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded"
                          >
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

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
};

export default UserList;
