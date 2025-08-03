import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useUpdateTicketCategoryMutation,
  useGetTicketCategoryByIdQuery,
} from "../../redux/features/ticketcategories/ticketCategoriesApiSlice";

import {
  Calendar,
  DollarSign,
  Package,
  ShoppingCart,
  Tag,
  AlertCircle,
  CheckCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import PageLoading from "../../components/LoaderComponent/PageLoading";

const TicketCategoriesUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: existingDataWrapper,
    isLoading: isFetching,
    isError: fetchError,
  } = useGetTicketCategoryByIdQuery(id);

  const existingData = existingDataWrapper?.data;

  const [updateTicketCategory, { isLoading, isError }] =
    useUpdateTicketCategoryMutation();

  const [formData, setFormData] = useState({
    event_id: "",
    name: "",
    price: "",
    sales_start: "",
    sales_end: "",
    total_quantity: "",
    sold_quantity: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingData) {
      setFormData({
        event_id: existingData.event_id || "",
        name: existingData.name || "",
        price: existingData.price || "",
        sales_start: existingData.sales_start?.slice(0, 16) || "",
        sales_end: existingData.sales_end?.slice(0, 16) || "",
        total_quantity: existingData.total_quantity || "",
        sold_quantity: existingData.sold_quantity || "",
      });
    }
  }, [existingData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Category name is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!formData.total_quantity || formData.total_quantity <= 0)
      newErrors.total_quantity = "Total quantity must be greater than 0";
    if (formData.sold_quantity < 0)
      newErrors.sold_quantity = "Sold quantity cannot be negative";
    if (formData.sold_quantity > formData.total_quantity)
      newErrors.sold_quantity = "Sold quantity cannot exceed total quantity";
    if (formData.sales_start && formData.sales_end) {
      if (new Date(formData.sales_start) >= new Date(formData.sales_end)) {
        newErrors.sales_end = "Sales end date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["price", "total_quantity", "sold_quantity"];
    const parsedValue = numericFields.includes(name)
      ? value === ""
        ? ""
        : parseFloat(value)
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await updateTicketCategory({ id, ...formData }).unwrap();
      toast.success(response.message);
      navigate(-1);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Show loading
  if (isFetching) {
    return (
      <PageLoading/>
    );
  }

  // Show error
  if (fetchError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600">
            Unable to load ticket category. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {/* Form Header */}
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <Tag className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                 Update Category Details
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Update the ticket category information below
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Category Name - Full Width */}
                <div className="lg:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                    <Tag className="w-4 h-4 text-gray-600" />
                    Category Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl bg-white transition-colors ${
                      errors.name
                        ? "border-red-300 bg-red-50 focus:border-red-500"
                        : "border-gray-200 focus:border-amber-600"
                    } focus:outline-none focus:ring-0`}
                    placeholder="Enter category name"
                    required
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-600" />
                    Price (BDT)
                  </label>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl bg-white transition-colors ${
                      errors.price
                        ? "border-red-300 bg-red-50 focus:border-red-500"
                        : "border-gray-200 focus:border-amber-600"
                    } focus:outline-none focus:ring-0`}
                    placeholder="0.00"
                    required
                  />
                  {errors.price && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.price}
                    </p>
                  )}
                </div>

                {/* Total Quantity */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                    <Package className="w-4 h-4 text-gray-600" />
                    Total Quantity
                  </label>
                  <input
                    name="total_quantity"
                    type="number"
                    min="1"
                    value={formData.total_quantity}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl bg-white transition-colors ${
                      errors.total_quantity
                        ? "border-red-300 bg-red-50 focus:border-red-500"
                        : "border-gray-200 focus:border-amber-600"
                    } focus:outline-none focus:ring-0`}
                    placeholder="0"
                    required
                  />
                  {errors.total_quantity && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.total_quantity}
                    </p>
                  )}
                </div>

                {/* Sold Quantity */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                    <ShoppingCart className="w-4 h-4 text-gray-600" />
                    Sold Quantity
                  </label>
                  <input
                    name="sold_quantity"
                    type="number"
                    min="0"
                    value={formData.sold_quantity}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl bg-white transition-colors ${
                      errors.sold_quantity
                        ? "border-red-300 bg-red-50 focus:border-red-500"
                        : "border-gray-200 focus:border-amber-600"
                    } focus:outline-none focus:ring-0`}
                    placeholder="0"
                    required
                  />
                  {errors.sold_quantity && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.sold_quantity}
                    </p>
                  )}
                </div>

                {/* Available Quantity (Computed) */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                    <Package className="w-4 h-4 text-gray-600" />
                    Available Quantity
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium">
                    {(formData.total_quantity || 0) - (formData.sold_quantity || 0)} tickets
                  </div>
                </div>

                {/* Sales Start */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    Sales Start Date
                  </label>
                  <input
                    name="sales_start"
                    type="datetime-local"
                    value={formData.sales_start}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:border-amber-600 focus:outline-none focus:ring-0 transition-colors"
                    required
                  />
                </div>

                {/* Sales End */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    Sales End Date
                  </label>
                  <input
                    name="sales_end"
                    type="datetime-local"
                    value={formData.sales_end}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl bg-white transition-colors ${
                      errors.sales_end
                        ? "border-red-300 bg-red-50 focus:border-red-500"
                        : "border-gray-200 focus:border-amber-600"
                    } focus:outline-none focus:ring-0`}
                    required
                  />
                  {errors.sales_end && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.sales_end}
                    </p>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {isError && (
                <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="text-red-800 font-medium">
                    Update failed. Please try again.
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 mt-12 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Update Category
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCategoriesUpdate;