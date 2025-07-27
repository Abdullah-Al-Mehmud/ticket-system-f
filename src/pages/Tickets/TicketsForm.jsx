import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {ArrowRight} from 'lucide-react'
import { Button } from "@/components/ui/button";

import { useCreateTicketMutation } from "../../redux/features/tickets/ticketsApiSlice";
import { useGetUserQuery } from "../../redux/features/auth/AuthApiSlice";
import { useGetEventsQuery } from "../../redux/features/event/EventApiSlice";

const TicketsForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: "",
    event_id: "",
    ticket_quantity: 1,
  });

  const [createTicket, { isLoading }] = useCreateTicketMutation();

  const { data: usersData, isLoading: usersLoading } = useGetUserQuery();
  const { data: eventsData, isLoading: eventsLoading } = useGetEventsQuery();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createTicket({
        user_id: Number(formData.user_id),
        event_id: Number(formData.event_id),
        ticket_quantity: Number(formData.ticket_quantity),
      }).unwrap();

      toast.success(res.message || "Ticket created successfully!");
      navigate("/admin/tickets", { state: { refresh: true } });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create ticket");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Add New Ticket
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User <span className="text-red-500">*</span>
            </label>
            <select
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              required
              disabled={usersLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a user</option>
              {usersData?.data?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} (ID: {user.id})
                </option>
              ))}
            </select>
          </div>

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
              {eventsData?.data?.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title} (ID: {event.id})
                </option>
              ))}
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

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-800 transition-colors duration-300 ease-in-out group"
          >
            {isLoading ? "Creating..." : "Create Ticket"}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>

       

        </form>
      </div>
    </div>
  );
};

export default TicketsForm;
