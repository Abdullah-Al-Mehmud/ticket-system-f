import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useGetTicketByIdQuery,
  useUpdateTicketMutation,
} from "../../../../store/features/tickets/ticketsApiSlice";
import { useGetTicketCategoriesQuery } from "../../../../store/features/ticketCategories/ticketCategoriesApiSlice";
const TicketsEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    ticket_category_id: "",
    quantity: 1,
    status: "Confirmed",
  });

  const { data: ticketData, isLoading: loadingTicket } =
    useGetTicketByIdQuery(id);
  const { data: categoriesData, isLoading: loadingCategories } =
    useGetTicketCategoriesQuery({ all: true });
  const [updateTicket, { isLoading }] = useUpdateTicketMutation();

  useEffect(() => {
    if (ticketData?.data) {
      const { ticket_category_id, quantity, status } = ticketData.data;
      setFormData({
        ticket_category_id: ticket_category_id ?? "",
        quantity: quantity ?? 1,
        status: status ?? "Confirmed",
      });
    }
  }, [ticketData]);

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
      const res = await updateTicket({
        id,
        ...formData,
        ticket_category_id: Number(formData.ticket_category_id),
        quantity: Number(formData.quantity),
      }).unwrap();

      toast.success(res.message || "Ticket updated successfully!");
      navigate("/admin/tickets-list", { state: { refresh: true } });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update ticket");
    }
  };

  if (loadingTicket)
    return <div className="text-center p-4">Loading ticket...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Ticket</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ticket Category
            </label>
            <select
              name="ticket_category_id"
              value={formData.ticket_category_id}
              onChange={handleChange}
              required
              disabled={loadingCategories}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-amber-500 focus:border-amber-500 disabled:bg-gray-100"
            >
              <option value="">Select Category</option>
              {categoriesData?.data?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} (৳{cat.price})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg  focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-600 text-white text-lg font-semibold py-3 rounded-lg hover:from-amber-700 hover:to-amber-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Updating..." : "Update Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketsEdit;
