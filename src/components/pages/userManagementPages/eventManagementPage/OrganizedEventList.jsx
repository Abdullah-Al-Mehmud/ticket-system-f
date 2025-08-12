import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetOrganizerEventsQuery } from "../../../../store/features/event/EventApiSlice";
import TableRowSkeleton from "../../../../components/common/LoaderComponent/TableRowSkeleton";
import { Eye } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const statusTabs = ["All", "Upcoming", "Live", "Done", "Cancelled"];

function OrganizedEventList() {
  const { data, isLoading, isError } = useGetOrganizerEventsQuery();
  const [activeTab, setActiveTab] = useState("All");

  const filteredEvents =
    data?.data?.filter((event) =>
      activeTab === "All" ? true : event.status === activeTab
    ) || [];

  return (
    <div className="bg-white rounded-lg overflow-hidden mt-8">
      {/* Header */}
      <div className="px-6 py-4 border-b border-amber-200">
        <h2 className="text-lg font-medium text-amber-900">My Events</h2>
      </div>

      {/* Status Tabs */}
      <div className="px-6 py-3 bg-amber-100 border-b border-amber-200">
        <div className="flex space-x-1">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab
                  ? "bg-amber-600 text-white"
                  : "text-amber-600 hover:bg-amber-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isLoading && (
          <div className="text-center py-6 text-amber-600">
            <TableRowSkeleton count={2} />
          </div>
        )}

        {isError && (
          <div className="text-center py-6 text-red-500">
            Failed to load events.
          </div>
        )}

        {!isLoading && !isError && filteredEvents.length === 0 && (
          <div className="text-center py-6 text-amber-600">
            {activeTab === "All"
              ? "No events found."
              : `No ${activeTab.toLowerCase()} events found.`}
          </div>
        )}

        {!isLoading && !isError && filteredEvents.length > 0 && (
          <div className="max-h-[500px] overflow-y-auto space-y-4">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start border-t border-amber-200 bg-white rounded-lg overflow-hidden p-4"
              >
                {/* Left Image */}
                <div className="w-60 h-40 flex-shrink-0 relative rounded-lg overflow-hidden bg-gray-100">
                  {event.image_url ? (
                    <>
                      <img
                        src={`${import.meta.env.VITE_IMG_URL}/${
                          event.image_url
                        }`}
                        alt={event.title}
                        className="w-full h-full object-cover absolute top-0 left-0"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget.nextElementSibling;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                      {/* Fallback if image fails */}
                      <div className="fallback-img hidden w-full h-full absolute top-0 left-0 items-center justify-center bg-gray-200">
                        <span className="text-2xl font-bold text-slate-700">
                          TapKori
                        </span>
                      </div>
                    </>
                  ) : (
                    // No image_url case
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-2xl font-bold text-slate-700">
                        TapKori
                      </span>
                    </div>
                  )}
                </div>

                {/* Event Content */}
                <div className="flex-1 ml-6 flex flex-col justify-between">
                  {/* Title & Time + Eye Icon */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        {event.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {dayjs(event.start_date).format("MMM D, YYYY h:mm A")} (
                        {dayjs(event.start_date).fromNow()})
                      </p>
                    </div>

                    {/* Eye Icon */}
                    <Link
                      to={`/event-details/${event.id}`}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Eye />
                    </Link>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-12 mt-auto pt-15">
                    <Link
                      to={`/user/events-sales-overview/${event.id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-medium text-sm"
                    >
                      Sales Overview
                    </Link>
                    <Link
                      to={`/user/events-ticket-list/${event.id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-medium text-sm"
                    >
                      Ticket Details
                    </Link>
                    <Link
                      to={`/event-details/${event.id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-medium text-sm"
                    >
                      On Cart
                    </Link>
                    <Link
                      to="#"
                      className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-medium text-sm"
                    >
                      Pre-Registration
                    </Link>

                    {/* Divider - hide on small screens */}
                    <div className="hidden sm:block w-px h-6 bg-gray-300 mx-2" />

                    {/* Scanners Button */}
                    <Link
                      to={`/user/scanners-event/${event.id}`}
                      className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded font-medium text-sm"
                    >
                      <i className="fas fa-qrcode mr-2"></i>
                      Scanners
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrganizedEventList;
