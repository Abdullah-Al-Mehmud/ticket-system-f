import React, { useEffect, useState } from "react";
import {
  useUpdateTicketCategoryMutation,
  useCreateTicketCategoryMutation,
} from "../../redux/features/ticketcategories/ticketCategoriesApiSlice";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  Ticket,
  Calendar,
  DollarSign,
  Package,
  TrendingUp,
  X,
} from "lucide-react";

const TicketCategoryModal = ({ isOpen, onClose, initialData }) => {
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    price: "",
    sales_start: "",
    sales_end: "",
    total_quantity: "",
    sold_quantity: 0,
  });

  const [updateTicketCategory] = useUpdateTicketCategoryMutation();
  const [createTicketCategory] = useCreateTicketCategoryMutation();

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        price: initialData.price || "",
        sales_start: initialData.sales_start || "",
        sales_end: initialData.sales_end || "",
        total_quantity: initialData.total_quantity || "",
        sold_quantity: initialData.sold_quantity || 0,
      });
    } else {
      setForm({
        name: "",
        price: "",
        sales_start: "",
        sales_end: "",
        total_quantity: "",
        sold_quantity: 0,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      toast.error("Event ID is missing.");
      return;
    }

    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        total_quantity: parseInt(form.total_quantity),
        sold_quantity: parseInt(form.sold_quantity),
      };

      if (initialData?.id) {
        await updateTicketCategory({ id: initialData.id, ...payload }).unwrap();
        toast.success("Ticket category updated successfully.");
      } else {
        await createTicketCategory({ ...payload, event_id: id }).unwrap();
        toast.success("Ticket category created successfully.");
      }

      onClose();
    } catch (error) {
      console.error("Submit failed:", error);
      toast.error("Failed to save ticket category.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0   flex justify-center items-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-lg transform animate-in slide-in-from-bottom-4 duration-500 ">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-orange-600 via-orange-600 to-orange-600 p-6 rounded-t-2xl">
          <div className="absolute inset-0 bg-opacity-10 rounded-t-2xl"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                <Ticket className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {initialData ? "Edit" : "Create"} Ticket Category
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-amber-700 hover:bg-opacity-20 rounded-xl transition-all duration-200 group"
            >
              <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category Name */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ticket Category Name
            </label>
            <div className="relative">
              <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g., VIP, General"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:bg-white"
                required
              />
            </div>
          </div>

          {/* Price and Total Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Quantity
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="total_quantity"
                  value={form.total_quantity}
                  onChange={handleChange}
                  type="number"
                  placeholder="100"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:bg-white"
                  required
                />
              </div>
            </div>
            {/* Sold Quantity */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sold Quantity
              </label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="sold_quantity"
                  value={form.sold_quantity}
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:bg-white"
                />
              </div>
            </div>
          </div>
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                type="number"
                step="0.01"
                placeholder="0.00"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white"
                required
              />
            </div>
          </div>

          {/* Sales Start and End Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sales Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="sales_start"
                  value={form.sales_start}
                  onChange={handleChange}
                  type="datetime-local"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sales End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="sales_end"
                  value={form.sales_end}
                  onChange={handleChange}
                  type="datetime-local"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Sales Progress */}
          {form.total_quantity && form.sold_quantity ? (
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Sales Progress</span>
                <span>
                  {Math.min(
                    100,
                    Math.round((form.sold_quantity / form.total_quantity) * 100)
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      (form.sold_quantity / form.total_quantity) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          ) : null}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 font-medium transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-700 hover:to-orange-700 text-white rounded-xl transition-all duration-200 font-medium transform hover:scale-105"
            >
              {initialData ? "Update Category" : "Create Category"}
            </button>
          </div>
        </form>
      </div>

      <div className="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-50 -z-10"></div>
    </div>
  );
};

export default TicketCategoryModal;
