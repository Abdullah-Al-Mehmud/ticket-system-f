import React, { useEffect, useState } from "react";
import {
  useUpdateTicketCategoryMutation,
  useCreateTicketCategoryMutation,
} from "../../redux/features/ticketcategories/ticketCategoriesApiSlice";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const TicketCategoryModal = ({ isOpen, onClose, initialData }) => {
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    price: "",
    sales_start: "",
    sales_end: "",
    total_quantity: "",
    sold_quantity: "",
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
  if (!id) {
    toast.error("Event ID is missing.");
    return;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        total_quantity: parseInt(form.total_quantity),
        sold_quantity: parseInt(form.sold_quantity),
      };

      if (initialData?.id) {
        // Update existing category
        await updateTicketCategory({ id: initialData.id, ...payload }).unwrap();
        toast.success("Ticket category updated successfully.");
      } else {
        // Create new category with event_id
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
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit" : "Create"} Ticket Category
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Category Name"
            className="border p-2 w-full rounded"
            required
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            className="border p-2 w-full rounded"
            required
          />
          <input
            name="total_quantity"
            value={form.total_quantity}
            onChange={handleChange}
            placeholder="Total Quantity"
            type="number"
            className="border p-2 w-full rounded"
            required
          />
          <input
            name="sold_quantity"
            value={form.sold_quantity}
            onChange={handleChange}
            placeholder="Sold Quantity"
            type="number"
            className="border p-2 w-full rounded"
          />
          <input
            name="sales_start"
            value={form.sales_start}
            onChange={handleChange}
            type="datetime-local"
            className="border p-2 w-full rounded"
            required
          />
          <input
            name="sales_end"
            value={form.sales_end}
            onChange={handleChange}
            type="datetime-local"
            className="border p-2 w-full rounded"
            required
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketCategoryModal;
