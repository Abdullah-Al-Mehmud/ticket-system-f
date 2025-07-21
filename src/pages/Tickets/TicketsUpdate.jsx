import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  useUpdateTicketMutation,
  useGetTicketByIdQuery,
} from "../../redux/features/tickets/ticketsApiSlice";
import { useGetEventsQuery } from "../../redux/features/event/EventApiSlice";

const TicketsUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Ticket ID

  const [formData, setFormData] = useState({
    event_id: "",
    ticket_quantity: 1,
    status: "booked",
  });

  // Fetch ticket by ID
  const { data: ticketData, isLoading: loadingTicket } =
    useGetTicketByIdQuery(id);
  const [updateTicket, { isLoading }] = useUpdateTicketMutation();

  // Fetch events
  const { data: eventsData, isLoading: eventsLoading } = useGetEventsQuery();

  // Prefill form when ticket data arrives
  useEffect(() => {
    if (ticketData?.data) {
      const { event_id, ticket_quantity, status } = ticketData.data;
      setFormData({
        event_id: event_id ?? "",
        ticket_quantity: ticket_quantity ?? 1,
        status: status ?? "booked",
      });
    }
  }, [ticketData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateTicket({
        id,
        ...formData,
        event_id: Number(formData.event_id),
        ticket_quantity: Number(formData.ticket_quantity),
      }).unwrap();

      toast.success(res.message || "Ticket updated successfully!");
      navigate("/admin/tickets", { state: { refresh: true } });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update ticket");
    }
  };

  if (loadingTicket)
    return <div className="text-center p-4">Loading ticket...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Update Ticket
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event <span className="text-red-500">*</span>
            </label>
            <select
              name="event_id"
              value={formData.event_id}
              onChange={handleChange}
              required
              disabled={eventsLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an event</option>
              {eventsLoading ? (
                <option>Loading events...</option>
              ) : (
                eventsData?.data?.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title} (
                    {new Date(event.start_date).toLocaleDateString()})
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ticket Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="ticket_quantity"
              min="1"
              value={formData.ticket_quantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="booked">Booked</option>
              <option value="canceled">Canceled</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketsUpdate;
