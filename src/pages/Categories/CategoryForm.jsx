import React, { useState } from "react";
import { useCreateCategoryMutation } from "../../redux/features/categories/categoriesApiSlice";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const CategoryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    status: "active",
  });

  const [createCategory, { isLoading, isSuccess, isError, error }] =
    useCreateCategoryMutation();

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
      let res = await createCategory(formData).unwrap();
      toast.success(res.message);
      navigate("/admin/categories"); // redirect after create
    } catch (err) {
      console.error("❌ Category creation failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Category</h2>
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
              placeholder="e.g. Electronics"
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
              disabled={isLoading}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Category"}
            </button>
          </div>

          {/* Feedback Message */}
          {isError && (
            <p className="text-sm text-red-600 mt-2">
              ❌ {error?.data?.message || "Something went wrong!"}
            </p>
          )}

          {isSuccess && (
            <p className="text-sm text-green-600 mt-2">
              ✅ Category created successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
