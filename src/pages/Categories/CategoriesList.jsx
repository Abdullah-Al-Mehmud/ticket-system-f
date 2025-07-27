import React, { useState, useEffect, useMemo } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  MoreVertical,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../redux/features/categories/categoriesApiSlice";
import toast from "react-hot-toast";

const CategoriesList = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [deleteCategory] = useDeleteCategoryMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");

  // useEffect to call RTK API
  const { data, isLoading, isError, refetch } = useGetCategoriesQuery(
    undefined,
    {
      skip: false,
    }
  );

  useEffect(() => {
    if (data?.data) setCategories(data.data);
  }, [data]);

  useEffect(() => {
    if (location.state?.refresh) {
      refetch();
    }
  }, [location.state]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        let res = await deleteCategory(id).unwrap();
        toast.success(res.message || "Category deleted successfully!!");
        refetch();
      } catch (err) {
        console.error(err);
        alert("Failed to delete category");
      }
    }
  };

  const handleSort = (column) => {
    setSortBy(column);
    setSortOrder((prev) =>
      sortBy === column && prev === "asc" ? "desc" : "asc"
    );
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

  const filteredCategories = useMemo(() => {
    return categories
      .filter(
        (cat) =>
          cat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (statusFilter === "all" || cat.status === statusFilter)
      )
      .sort((a, b) => {
        const aVal =
          typeof a[sortBy] === "string" ? a[sortBy].toLowerCase() : a[sortBy];
        const bVal =
          typeof b[sortBy] === "string" ? b[sortBy].toLowerCase() : b[sortBy];
        return sortOrder === "asc"
          ? aVal > bVal
            ? 1
            : -1
          : aVal < bVal
          ? 1
          : -1;
      });
  }, [categories, searchTerm, statusFilter, sortBy, sortOrder]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Categories</h1>
            <p className="mt-2 text-gray-600">
              All available categories from the backend
            </p>
          </div>
          <Link
            to="/admin/create-category"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} /> Add Category
          </Link>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter size={16} /> Filter
              </button>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Download size={16} /> Export
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {isLoading ? (
             
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-dashed border-amber-600 rounded-full animate-spin"></div>
          <div className="absolute inset-4 bg-amber-600 rounded-full animate-ping"></div>
        </div>
        <p className="text-white text-lg font-semibold animate-pulse">Loading...</p>
      </div>
    </div>
          ) : isError ? (
            <div className="text-center py-12 text-red-500">
              Failed to load categories.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      {["id", "name", "status", "created_at", "updated_at"].map(
                        (col) => (
                          <th
                            key={col}
                            className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort(col)}
                          >
                            {col.replace("_", " ").toUpperCase()}
                            {sortBy === col && (
                              <span className="ml-1">
                                {sortOrder === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </th>
                        )
                      )}
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredCategories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          <Link
                            to={`/admin/categories/${category.id}`}
                            className="hover:underline text-black-600"
                            title="View Category"
                          >
                            #{category.id}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <Link
                            to={`/admin/categories/${category.id}`}
                            className="hover:underline text-black-600"
                            title="View Category"
                          >
                            {category.name}
                          </Link>
                        </td>

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
                              to={`/admin/categories/${category.id}`}
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded"
                              title="View"
                            >
                              <Eye size={16} />
                            </Link>
                            <Link
                              to={`/admin/categories/edit/${category.id}`}
                              className="text-green-600 hover:text-green-800 hover:bg-green-50 p-1 rounded"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </Link>
                            <button
                              onClick={() => handleDelete(category.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No categories found matching your criteria.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
