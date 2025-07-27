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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-xl shadow-lg flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-gray-700 font-medium">
            Loading ticket category...
          </span>
        </div>
      </div>
    );
  }

  // Show error
  if (fetchError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Update Ticket Category
              </h1>
              <p className="text-sm text-gray-500">ID: {id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Category Details
            </h2>
            <p className="text-blue-100 mt-1">
              Update the ticket category information below
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Tag className="w-4 h-4" />
                    Category Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.name
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Price (BDT)
                  </label>
                  <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.price
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.price}
                    </p>
                  )}
                </div>

                {/* Total Quantity */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Package className="w-4 h-4" />
                    Total Quantity
                  </label>
                  <input
                    name="total_quantity"
                    type="number"
                    value={formData.total_quantity}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.total_quantity
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.total_quantity && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.total_quantity}
                    </p>
                  )}
                </div>

                {/* Sold Quantity */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <ShoppingCart className="w-4 h-4" />
                    Sold Quantity
                  </label>
                  <input
                    name="sold_quantity"
                    type="number"
                    value={formData.sold_quantity}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.sold_quantity
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.sold_quantity && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.sold_quantity}
                    </p>
                  )}
                </div>

                {/* Available Quantity (computed) */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Package className="w-4 h-4" />
                    Available Quantity
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg">
                    {(formData.total_quantity || 0) -
                      (formData.sold_quantity || 0)}
                  </div>
                </div>

                {/* Sales Start */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4" />
                    Sales Start
                  </label>
                  <input
                    name="sales_start"
                    type="datetime-local"
                    value={formData.sales_start}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                {/* Sales End */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4" />
                    Sales End
                  </label>
                  <input
                    name="sales_end"
                    type="datetime-local"
                    value={formData.sales_end}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.sales_end
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.sales_end && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.sales_end}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
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

              {isError && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-800 font-medium">
                    Update failed. Please try again.
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCategoriesUpdate;
