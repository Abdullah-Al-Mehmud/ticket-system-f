import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useGetTicketByIdQuery } from "../../../redux/features/tickets/ticketsApiSlice";
import {
  Calendar,
  MapPin,
  Ticket,
  BadgeDollarSign,
  Loader2,
  CheckCircle,
  XCircle,
  Timer,
  TimerOff
} from "lucide-react";

export default function UserViewTicket() {
  const { id } = useParams();
  const [isHovered, setIsHovered] = useState(false);

  const { data, isLoading, isError } = useGetTicketByIdQuery(id);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const ticket = data?.data;

  if (isLoading) {
    return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full border-4 border-t-4 border-gray-200 border-t-blue-600 animate-spin"></div>
        <p className="text-blue-600 text-lg font-medium animate-pulse">Loading, please wait...</p>
      </div>
    </div>
    );
  }

  if (isError || !ticket) {
    return (
      <div className="p-6 text-center text-red-600 font-bold">
        Ticket not found or failed to load.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6 flex items-center justify-center">
      <div 
        className={`w-full max-w-xl bg-white rounded-3xl shadow-xl p-8 transition-transform duration-300 ${
          isHovered ? "scale-105 shadow-2xl" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-4">🎫 Ticket Information</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Ticket className="text-gray-600" />
            <span className="text-gray-800 font-medium">Title:</span>
            <span>{ticket.event.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="text-gray-600" />
            <span className="text-gray-800 font-medium">Location:</span>
            <span>{ticket.event.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Timer className="text-gray-600" />
            <span className="text-gray-800 font-medium">Start Data:</span>
            <span>{formatDateTime(ticket.event.start_date)}</span>
          </div>

          <div className="flex items-center gap-2">
            <TimerOff className="text-gray-600" />
            <span className="text-gray-800 font-medium">End Data:</span>
            <span>{formatDateTime(ticket.event.end_date)}</span>
          </div>


          <div className="flex items-center gap-2">
            <Calendar className="text-gray-600" />
            <span className="text-gray-800 font-medium">Category:</span>
            <span>{ticket.event.category.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <BadgeDollarSign className="text-gray-600" />
            <span className="text-gray-800 font-medium">Price per ticket:</span>
            <span>${ticket.price_per_ticket}</span>
          </div>

          <div className="flex items-center gap-2">
            <Ticket className="text-gray-600" />
            <span className="text-gray-800 font-medium">Quantity:</span>
            <span>{ticket.ticket_quantity}</span>
          </div>

          <div className="flex items-center gap-2">
            {ticket.status === "confirmed" ? (
              <CheckCircle className="text-green-500" />
            ) : (
              <XCircle className="text-red-500" />
            )}
            <span className="text-gray-800 font-medium">Status:</span>
            <span className={`font-semibold ${ticket.status === "confirmed" ? "text-green-600" : "text-red-600"}`}>
              {ticket.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}







