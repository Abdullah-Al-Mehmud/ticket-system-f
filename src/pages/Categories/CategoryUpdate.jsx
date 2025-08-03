import React, { useEffect, useState } from "react";
import {
  useUpdateCategoryMutation,
  useGetCategoryByIdQuery,
} from "../../redux/features/categories/categoriesApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import PageLoading from "../../components/LoaderComponent/PageLoading";

const CategoryUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (categoryData?.data) {
      const { name, status } = categoryData.data;
      setFormData({ name, status });
    }
    if (fetchError) {
      toast.error("Failed to load category data");
    }
  }, [categoryData, fetchError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateCategory({ id, ...formData }).unwrap();
      toast.success(res.message || "Category updated successfully!");
      navigate("/admin/categories", { state: { refresh: true } });
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Edit Category
        </h2>

        {fetching ? (
          <p><PageLoading/></p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Field */}
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
            <button
              type="submit"
              disabled={updating}
              className="w-full bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-800 disabled:opacity-50"
            >
              {updating ? "Updating..." : "Update Category"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CategoryUpdate;
