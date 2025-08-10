import React from "react";
import { useParams } from "react-router-dom";
import { useGetTicketByIdQuery } from "../../../../store/features/tickets/ticketsApiSlice";
import { Loader2, XCircle, MapPin, Scissors } from "lucide-react";
import PageLoading from "../../../../components/common/loaderComponent/PageLoading";

export default function BookingTicketDetails() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetTicketByIdQuery(id);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatTime = (dateStr) =>
    new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  if (isLoading) {
    return (
      <PageLoading className="min-h-screen bg-gray-100 flex items-center justify-center" />
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-lg text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Ticket Not Found
          </h3>
          <p className="text-gray-600">
            We couldn't find the ticket you're looking for.
          </p>
        </div>
      </div>
    );
  }

  const ticket = data.data;
  const event = ticket.event;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div
          className="bg-white border border-amber-600 rounded-lg overflow-hidden"
          style={{ fontFamily: "monospace" }}
        >
          <div className="flex">
            {/* Main Ticket Body */}
            <div className="flex-1 p-8 relative">
              <div className="border-b-2 border-dashed border-gray-300 pb-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h1>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-amber-600 text-white px-3 py-1 rounded text-xs font-bold mb-2">
                      {ticket.status?.toUpperCase()}
                    </div>
                    <div className="text-xs text-gray-500">
                      #{ticket.ticket_number}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="mb-4">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Start Date
                    </label>
                    <div className="text-lg font-mono text-gray-900">
                      {formatDate(event.start_date)}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      End Date
                    </label>
                    <div className="text-lg font-mono text-gray-900">
                      {formatDate(event.end_date)}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Start Time
                    </label>
                    <div className="text-lg font-mono text-gray-900">
                      {formatTime(event.start_date)}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      End Time
                    </label>
                    <div className="text-lg font-mono text-gray-900">
                      {formatTime(event.end_date)}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Category
                    </label>
                    <div className="text-lg font-mono text-gray-900">
                      {event.category?.name || "N/A"}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Quantity
                    </label>
                    <div className="text-lg font-mono text-gray-900">
                      {ticket.quantity} TICKET{ticket.quantity > 1 ? "S" : ""}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Price Each
                    </label>
                    <div className="text-lg font-mono text-gray-900">
                      ৳{ticket.price_per_ticket}
                    </div>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="border-t-2 border-dashed border-gray-300 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    Total Amount
                  </span>
                  <span className="text-3xl font-bold text-amber-600">
                    ৳{ticket.total_price}
                  </span>
                </div>
              </div>

              {/* Perforation */}
              <div className="absolute right-0 top-0 bottom-0 w-6 flex flex-col justify-center items-center">
                {Array.from({ length: 12 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-4 h-4 bg-gray-100 rounded-full mb-2"
                  ></div>
                ))}
              </div>
            </div>

            {/* Stub Section */}
            <div className="w-48 bg-gray-50 p-6 border-l-2 border-dashed border-gray-300 relative">
              <div className="transform rotate-90 origin-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32">
                <div className="text-center">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Admit One
                  </div>
                  <div className="text-sm font-bold text-amber-600 mb-2">
                    #{ticket.ticket_number}
                  </div>
                  <div className="text-xs text-gray-600">
                    {formatDate(event.start_date)}
                  </div>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="w-24 h-24 bg-white border-2 border-gray-300 rounded flex items-center justify-center mx-auto">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm6 0h2v2h-2V5zm4 0h8v8h-8V3zm2 2v4h4V5h-4zm-8 8H3v8h8v-8zm-2 2v4H5v-4h4zm2-2h2v2h-2v-2zm2 0h2v2h-2v-2zm2 0h2v2h-2v-2zm0 4h2v2h-2v-2zm-4 0h2v2h-2v-2zm4-2v2h2v-2h-2zm0-2h2v2h-2v-2z" />
                  </svg>
                </div>
                <div className="text-center mt-2 text-xs text-gray-500">
                  SCAN AT VENUE
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="border-t-2 border-dashed border-gray-300 bg-gray-50 px-8 py-4">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center">
                <Scissors className="w-3 h-3 mr-2" />
                <span>DETACH AT VENUE</span>
              </div>
              <div>
                Valid for: {ticket.quantity} person
                {ticket.quantity > 1 ? "s" : ""}
              </div>
              <div>Keep this portion</div>
            </div>
          </div>
        </div>

        {/* Fine Print */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>
            This ticket is non-refundable and non-transferable. Please arrive 30
            minutes before event start time.
          </p>
          <p className="mt-1">
            For support, contact us at support@eventtickets.com
          </p>
        </div>
      </div>
    </div>
  );
}
