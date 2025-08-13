import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Ticket,
  ShoppingCart,
  Plus,
  Minus,
  Users,
  Info,
  ShieldCheck,
} from "lucide-react";
import { useGetEventByIdQuery } from "../../../../../store/features/event/EventApiSlice";
import { useCreateTicketMutation } from "../../../../../store/features/tickets/ticketsApiSlice";
import toast from "react-hot-toast";
import BookingModal from "./BookingModal";
import PageLoading from "../../../../../components/common/loaderComponent/PageLoading";

const EventDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useGetEventByIdQuery(id);
  const [createTicket, { isLoading: bookingLoading }] =
    useCreateTicketMutation();
  const [ticketQuantities, setTicketQuantities] = useState({});
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const eventData = data?.data;
  const MAX_LENGTH = 200;
  const isLongText = eventData?.event_description.length > MAX_LENGTH;
  const hasOrganizers =
    eventData?.organizers && eventData?.organizers.length > 0;

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  if (isLoading)
    return (
      <div className="text-center p-10">
        <PageLoading />
      </div>
    );
  if (isError || !data?.data)
    return (
      <div className="text-center p-10 text-red-500">Error loading event.</div>
    );

  const requireLogin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return false;
    }
    return true;
  };


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
      if (!requireLogin()) return;
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
      if (!requireLogin()) return;
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
      toast.error("Booking failed. Please try again.");
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                About This Event
              </h2>
              <p className="text-gray-600 text-lg">
                {isExpanded || !isLongText
                  ? eventData.event_description
                  : `${eventData.event_description.slice(0, MAX_LENGTH)}...`}
              </p>
              {isLongText && (
                <button
                  onClick={toggleExpand}
                  className="text-amber-600 mt-2 hover:text-amber-800 transition"
                >
                  {isExpanded ? "...See less" : "...See more"}
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Event Details
              </h2>

              <div className="space-y-5">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-blue-500 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Location</h3>
                    <p className="text-gray-600">{eventData.location}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <User className="w-6 h-6 text-green-500 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Organized by
                    </h3>
                    <p className="text-gray-600">{eventData.creator?.name}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="w-6 h-6 text-purple-500 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Additional Organizers
                    </h3>
                    {hasOrganizers ? (
                      <ul className="text-gray-600 list-disc list-inside">
                        {eventData.organizers.map((org, index) => (
                          <li key={index}>{org.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 italic">
                        No additional organizers
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <Info className="w-6 h-6 text-yellow-500 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Status</h3>
                    <p
                      className={`text-sm font-medium px-3 py-1 rounded-full inline-block 
              ${eventData.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                        }`}
                    >
                      {eventData.status}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <ShieldCheck className="w-6 h-6 text-indigo-500 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Privacy Policy
                    </h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {eventData.privacy_policy ||
                        "No privacy policy provided."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl  p-8 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Ticket className="w-6 h-6 mr-2 text-amber-500" />
                Select Tickets
              </h2>

              <div className="space-y-3">
                {eventData.ticket_categories.map((ticket) => {
                  const available =
                    ticket.total_quantity - ticket.sold_quantity;
                  return (
                    <div
                      key={ticket.id}
                      className="bg-white border border-amber-200 rounded-2xl p-6  duration-200"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {ticket.name}
                          </h3>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                              {available} available
                            </span>
                          </div>
                          <p className="text-2xl font-bold text-amber-600">
                            ৳{parseFloat(ticket.price).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {isTicketAvailable(ticket) ? (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            Quantity:
                          </span>
                          <div className="flex items-center space-x-4 bg-gray-50 rounded-lg p-2">
                            <button
                              onClick={() => updateQuantity(ticket.id, -1)}
                              className="w-9 h-9 rounded-lg bg-white border border-gray-300 hover:border-amber-300 hover:bg-amber-50 flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300"
                              disabled={!ticketQuantities[ticket.id]}
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-900 text-lg min-w-[2rem]">
                              {ticketQuantities[ticket.id] || 0}
                            </span>
                            <button
                              onClick={() => updateQuantity(ticket.id, 1)}
                              className="w-9 h-9 rounded-lg bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-600"
                              disabled={
                                (ticketQuantities[ticket.id] || 0) >= 10
                              }
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                          <span className="text-red-600 font-medium text-sm">
                            Currently Unavailable
                          </span>
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
                    <span className="text-2xl font-bold text-amber-600">
                      ৳{getTotalAmount().toFixed(2)}
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
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onConfirm={handleConfirmBooking}
        totalTickets={getTotalTickets()}
        totalAmount={getTotalAmount()}
        isLoading={bookingLoading}
      />
    </div>
  );
};

export default EventDetailsPage;
