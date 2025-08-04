import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Ticket,
  ShoppingCart,
  Plus,
  Minus,
} from "lucide-react";
import { useGetEventByIdQuery } from "../../../redux/features/event/EventApiSlice";
import { useCreateTicketMutation } from "../../../redux/features/tickets/ticketsApiSlice";
import toast from "react-hot-toast";

const EventDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useGetEventByIdQuery(id);
  const [createTicket, { isLoading: bookingLoading }] =
    useCreateTicketMutation();
  const [ticketQuantities, setTicketQuantities] = useState({});
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (isLoading) return <div className="text-center p-10">Loading...</div>;
  if (isError || !data?.data)
    return (
      <div className="text-center p-10 text-red-500">Error loading event.</div>
    );

  const eventData = data.data;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const updateQuantity = (ticketId, change) => {
    setTicketQuantities((prev) => {
      const currentQty = prev[ticketId] || 0;
      const newQty = Math.max(0, Math.min(10, currentQty + change));
      if (newQty === 0) {
        const { [ticketId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [ticketId]: newQty };
    });
  };

  const getTotalAmount = () => {
    return Object.entries(ticketQuantities).reduce(
      (total, [ticketId, quantity]) => {
        const ticket = eventData.ticket_categories.find(
          (t) => t.id === parseInt(ticketId)
        );
        return total + (ticket ? parseFloat(ticket.price) * quantity : 0);
      },
      0
    );
  };

  const getTotalTickets = () => {
    return Object.values(ticketQuantities).reduce(
      (total, qty) => total + qty,
      0
    );
  };

  const handleBooking = () => {
    if (getTotalTickets() > 0) {
      setShowBookingModal(true);
    }
  };

  const isTicketAvailable = (ticket) => {
    const now = new Date();
    const start = new Date(ticket.sales_start);
    const end = new Date(ticket.sales_end);
    return (
      now >= start &&
      now <= end &&
      ticket.total_quantity - ticket.sold_quantity > 0
    );
  };
  const handleConfirmBooking = async () => {
    try {
      const bookings = Object.entries(ticketQuantities).map(
        ([ticketCategoryId, quantity]) => ({
          ticket_category_id: parseInt(ticketCategoryId),
          quantity,
          status: "Confirmed",
        })
      );

      for (const booking of bookings) {
        await createTicket(booking).unwrap();
      }

      toast.success("Booking successful!");
      setShowBookingModal(false);
      setTicketQuantities({});
      refetch();
    } catch (error) {
      alert("Booking failed. Please try again.");
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl  overflow-hidden mb-8">
          <div className="relative h-96">
            {eventData.image_url ? (
              <>
                <img
                  src={`${import.meta.env.VITE_IMG_URL}/${eventData.image_url}`}
                  alt={eventData.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentNode.querySelector(
                      ".fallback-img"
                    ).style.display = "flex";
                  }}
                />
                <div className="fallback-img hidden absolute inset-0 bg-gray-200 items-end justify-center pb-4 shadow-md">
                  <span className="text-xl font-bold text-slate-900">
                    TapKori
                  </span>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-6xl font-bold text-slate-400">
                  TapKori
                </span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{eventData.title}</h1>
              <div className="flex items-center space-x-4 text-lg opacity-90">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {formatDate(eventData.start_date)}
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  {formatTime(eventData.start_date)} -{" "}
                  {formatTime(eventData.end_date)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl  p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                About This Event
              </h2>
              <p className="text-gray-600 text-lg">
                {eventData.event_description}
              </p>
            </div>

            <div className="bg-white rounded-2xl  p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Event Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-blue-500 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Location</h3>
                    <p className="text-gray-600">{eventData.location}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <User className="w-6 h-6 text-green-500 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Organized by
                    </h3>
                    <p className="text-gray-600">{eventData.creator.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl  p-8 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Ticket className="w-6 h-6 mr-2 text-purple-500" />
                Select Tickets
              </h2>

              <div className="space-y-4">
                {eventData.ticket_categories.map((ticket) => {
                  const available =
                    ticket.total_quantity - ticket.sold_quantity;
                  return (
                    <div key={ticket.id} className="border rounded-xl p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {ticket.name}
                          </h3>
                          <p className="text-2xl font-bold text-purple-600">
                            ${parseFloat(ticket.price).toFixed(2)}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {available} available
                        </span>
                      </div>
                      {isTicketAvailable(ticket) ? (
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(ticket.id, -1)}
                            className="w-8 h-8 rounded-full bg-orange-200 hover:bg-orange-300 flex items-center justify-center"
                            disabled={!ticketQuantities[ticket.id]}
                          >
                            <Minus className="w-4 h-4 text-orange-700" />
                          </button>
                          <span className="w-8 text-center font-semibold text-orange-800">
                            {ticketQuantities[ticket.id] || 0}
                          </span>
                          <button
                            onClick={() => updateQuantity(ticket.id, 1)}
                            className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center"
                            disabled={(ticketQuantities[ticket.id] || 0) >= 10}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-red-500 font-medium text-center">
                          Not Available
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {getTotalTickets() > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">
                      Total ({getTotalTickets()} tickets)
                    </span>
                    <span className="text-2xl font-bold text-purple-600">
                      ${getTotalAmount().toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleBooking}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Book Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none backdrop-blur-sm  bg-opacity-30">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md  pointer-events-auto">
            <h3 className="text-2xl font-bold mb-4">Booking Confirmation</h3>
            <p className="mb-6 text-gray-600">
              You're about to book <strong>{getTotalTickets()}</strong>{" "}
              ticket(s) for
              <strong> ${getTotalAmount().toFixed(2)}</strong>.
            </p>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmBooking}
                className="flex-1 bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-orange-600 text-white py-3 px-6 rounded-xl"
              >
                {bookingLoading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;
