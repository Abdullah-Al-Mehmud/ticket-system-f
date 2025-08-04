import React, { useEffect, useState } from "react";
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
    count: 10,
    search: "",
    role: "",
  });

  const { data, isError, isLoading, refetch } = useGetUserListQuery(configPage);
  const [deleteUser] = useDeleteUserMutation();

  const users = data?.data ?? [];
  const currentPage = data?.current_page || 1;
  const lastPage = data?.last_page || 1;
  useEffect(() => {
    refetch();
  }, [refetch]);
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

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              User Management
            </h1>
            <p className="mt-2 text-gray-600">
              Manage and monitor user accounts
            </p>
          </div>
          <Link
            to="/admin/create-user"
            className="bg-amber-600 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded flex items-center gap-2"
          >
            <Plus size={20} /> Add User
          </Link>
        </div>

        <div className="mb-6 px-6">
          <AdminDashboard />
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 flex gap-2 w-full">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={() =>
                  setConfigPage((prev) => ({
                    ...prev,
                    search: searchTerm,
                    role: filterRole,
                    page: 1,
                  }))
                }
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Search
              </button>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterRole("");
                  setConfigPage({ page: 1, count: 10, search: "", role: "" });
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
              >
                Clear
              </button>
            </div>

            <select
              value={filterRole}
              onChange={(e) => {
                const role = e.target.value;
                setFilterRole(role);
                setConfigPage((prev) => ({
                  ...prev,
                  role,
                  page: 1,
                }));
              }}
              className="w-full sm:w-48 px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Created At
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <TableRowSkeleton count={5} />
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        <Link
                          to={`/admin/user-profile/${user.id}`}
                          className="hover:underline"
                        >
                          #{user.id.toString().padStart(3, "0")}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Link to={`/admin/user-profile/${user?.id}`}>
                          {user?.image_url ? (
                            <img
                              src={`${import.meta.env.VITE_IMG_URL}/${
                                user.image_url
                              }`}
                              alt={user?.name || "User Avatar"}
                              className="w-8 h-8 rounded-full object-cover"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "/default-image.png";
                              }}
                            />
                          ) : (
                            <div
                              className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-semibold uppercase"
                              title={user?.name || "Unknown User"}
                              aria-label={`User avatar placeholder for ${
                                user?.name || "Unknown"
                              }`}
                            >
                              {user?.name?.charAt(0) || "?"}
                            </div>
                          )}
                        </Link>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <Link
                          to={`/admin/user-profile/${user.id}`}
                          className="hover:underline"
                        >
                          {user.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(
                            user?.role?.name
                          )}`}
                        >
                          {getRoleIcon(user?.role?.name)}
                          <span className="ml-1 capitalize">
                            {user?.role?.name}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
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
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {lastPage > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() =>
                setConfigPage((prev) => ({
                  ...prev,
                  page: Math.max(1, currentPage - 1),
                }))
              }
              disabled={currentPage === 1}
              className={`px-3 py-2 border rounded-md text-sm ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Previous
            </button>

            {[...Array(lastPage)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() =>
                    setConfigPage((prev) => ({
                      ...prev,
                      page: pageNum,
                    }))
                  }
                  className={`px-3 py-2 border rounded-md text-sm ${
                    pageNum === currentPage
                      ? "bg-amber-600 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() =>
                setConfigPage((prev) => ({
                  ...prev,
                  page: Math.min(lastPage, currentPage + 1),
                }))
              }
              disabled={currentPage === lastPage}
              className={`px-3 py-2 border rounded-md text-sm ${
                currentPage === lastPage
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        )}

        <ConfirmModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this user?"
        />
      </div>
    </div>
  );
};

export default UserList;
