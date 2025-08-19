import React, { useState, useEffect } from "react";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmModal from "../../../common/confirmModel/ConfirmModal";
import TableRowSkeleton from "../../../common/loaderComponent/TableRowSkeleton";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../../../store/features/categories/categoriesApiSlice";

const CategoryList = () => {
  const location = useLocation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    search: "",
    status: "",
  });

  const { data, isLoading, refetch } = useGetCategoriesQuery(pageConfig);

  const categories = data?.data || [];

  useEffect(() => {
    if (location.state?.refresh) {
      refetch();
    }
  }, [location.state, refetch]);

  const handleDeleteClick = (id) => {
    setCategoryToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      const res = await deleteCategory(categoryToDelete).unwrap();
      toast.success(res.message || "Category deleted successfully!");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category");
    } finally {
      setIsModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCategoryToDelete(null);
  };

  const getStatusBadge = (status) => {
    const badgeMap = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full border ${
          badgeMap[status] || ""
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Categories</h1>
            <p className="mt-2 text-gray-600">All available categories</p>
          </div>
          <Link
            to="/admin/categories-create"
            className="bg-amber-600 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded flex items-center gap-2"
          >
            <Plus size={20} /> Add Category
          </Link>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 flex gap-2 w-full">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={() =>
                  setPageConfig((prev) => ({
                    ...prev,
                    search: searchTerm,
                    status: statusFilter === "all" ? "" : statusFilter,
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
                  setStatusFilter("all");
                  setPageConfig({
                    page: 1,
                    count: 10,
                    search: "",
                    status: "",
                  });
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
              >
                Clear
              </button>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                const status = e.target.value;
                setStatusFilter(status);
                setPageConfig((prev) => ({
                  ...prev,
                  status: status === "all" ? "" : status,
                  page: 1,
                }));
              }}
              className="w-full sm:w-48 px-4 py-3 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Created At
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Updated At
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <TableRowSkeleton count={4} />
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        <Link
                          to={`/admin/categories-list/${category.id}`}
                          className="hover:underline"
                        >
                          #{category.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm">{category.name}</td>
                      <td className="px-6 py-4 text-sm">
                        {getStatusBadge(category.status)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(category.created_at)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(category.updated_at)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/admin/categories-list/${category.id}`}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            to={`/admin/categories-edit/${category.id}`}
                            className="text-green-600 hover:text-green-800 hover:bg-green-50 p-1 rounded"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(category.id)}
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
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination */}
        {data?.last_page > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() =>
                setPageConfig((prev) => ({
                  ...prev,
                  page: Math.max(1, prev.page - 1),
                }))
              }
              disabled={pageConfig.page === 1}
              className={`px-3 py-2 border rounded-md text-sm ${
                pageConfig.page === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Previous
            </button>

            {[...Array(data.last_page)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() =>
                    setPageConfig((prev) => ({
                      ...prev,
                      page: pageNum,
                    }))
                  }
                  className={`px-3 py-2 border rounded-md text-sm ${
                    pageNum === pageConfig.page
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
                setPageConfig((prev) => ({
                  ...prev,
                  page: Math.min(data.last_page, prev.page + 1),
                }))
              }
              disabled={pageConfig.page === data.last_page}
              className={`px-3 py-2 border rounded-md text-sm ${
                pageConfig.page === data.last_page
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
          message="Are you sure you want to delete this category?"
        />
      </div>
    </div>
  );
};

export default CategoryList;
