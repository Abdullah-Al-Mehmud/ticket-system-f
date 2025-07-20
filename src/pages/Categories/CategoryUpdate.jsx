import React, { useEffect, useState } from "react";
import {
  useUpdateCategoryMutation,
  useGetCategoryByIdQuery,
} from "../../redux/features/categories/categoriesApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const CategoryUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // category ID from URL

  const [formData, setFormData] = useState({
    name: "",
    status: "active",
  });

  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();

  const {
    data: categoryData,
    isLoading: fetching,
    error: fetchError,
  } = useGetCategoryByIdQuery(id);

  // Set form data when fetch is successful
  useEffect(() => {
    if (categoryData?.data) {
      setFormData({
        name: categoryData.data.name,
        status: categoryData.data.status,
      });
    }
  }, [categoryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateCategory({ id, ...formData }).unwrap();
      toast.success(res.message || "Category updated");
      navigate("/admin/categories", { state: { refresh: true } });
    } catch (err) {
      console.error("❌ Update failed:", err);
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Edit Category
        </h2>

        {fetching ? (
          <p>Loading category...</p>
        ) : fetchError ? (
          <p className="text-red-600">❌ Failed to load category data.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Status Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={updating}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {updating ? "Updating..." : "Update Category"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CategoryUpdate;
