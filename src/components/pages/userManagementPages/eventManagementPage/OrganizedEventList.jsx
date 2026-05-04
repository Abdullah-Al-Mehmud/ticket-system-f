import TableRowSkeleton from "@/components/common/loaderComponent/TableRowSkeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Calendar, Clock, Eye, QrCode } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetOrganizerEventsQuery } from "../../../../store/features/event/EventApiSlice";

dayjs.extend(relativeTime);

const statusTabs = ["All", "Upcoming", "Live", "Done", "Cancelled"];

function OrganizedEventList() {
  const { data, isLoading, isError } = useGetOrganizerEventsQuery();
  const [activeTab, setActiveTab] = useState("All");

  const filteredEvents =
    data?.data?.filter((event) =>
      activeTab === "All" ? true : event.status === activeTab,
    ) || [];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "live":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "done":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-amber-100 text-amber-800";
    }
  };

  return (
    <div className="bg-white rounded border border-gray-200 overflow-hidden mt-8">
      {/* Header */}
      <div className="px-6 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-gray-50 to-gray-50">
        <h2 className="text-lg sm:text-lg font-semibold text-amber-900">
          My Events
        </h2>
        <p className="text-sm text-amber-600 mt-1">
          Manage and track your organized events
        </p>
      </div>

      {/* Status Tabs - Horizontal scroll on mobile */}
      <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b border-amber-200">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 sm:pb-0">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded transition-all duration-200 ${
                activeTab === tab
                  ? "bg-amber-600 text-white "
                  : "text-gray-600 hover:bg-white  border border-gray-200"
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {isLoading && (
          <div className="text-center py-8">
            <TableRowSkeleton count={2} />
          </div>
        )}

        {isError && (
          <div className="text-center py-12">
            <div className="text-red-500 text-lg font-medium mb-2">
              Failed to load events
            </div>
            <p className="text-gray-600">Please try refreshing the page</p>
          </div>
        )}

        {!isLoading && !isError && filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <div className="text-gray-600 text-lg font-medium mb-2">
              {activeTab === "All"
                ? "No events found"
                : `No ${activeTab.toLowerCase()} events found`}
            </div>
            <p className="text-gray-500">
              Create your first event to get started
            </p>
          </div>
        )}

        {!isLoading && !isError && filteredEvents.length > 0 && (
          <div className="space-y-4 sm:space-y-6 max-h-[600px] overflow-y-auto">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded overflow-hidden  transition-all duration-200 group">
                {/* Mobile Layout */}
                <div className="block sm:hidden">
                  {/* Mobile Image */}
                  <div className="w-full h-48 relative bg-gray-100">
                    {event.image_url ? (
                      <>
                        <img
                          src={`${import.meta.env.VITE_IMG_URL}/${event.image_url}`}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget.nextElementSibling;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                        <div className="fallback-img hidden w-full h-full absolute top-0 left-0 items-center justify-center bg-gradient-to-br from-gray-400 to-gray-500">
                          <span className="text-2xl font-bold text-white">
                            TapKori
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-400 to-gray-500">
                        <span className="text-2xl font-bold text-white">
                          TapKori
                        </span>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div
                      className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </div>

                    {/* View Button */}
                    <Link
                      to={`/event-details/${event.id}`}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded flex items-center justify-center text-gray-700 hover:bg-white transition-colors">
                      <Eye size={16} />
                    </Link>
                  </div>

                  {/* Mobile Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      <Link to={`/event-details/${event.id}`}>
                        {event.title}
                      </Link>
                    </h3>

                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Calendar size={16} className="mr-2" />
                      <span>
                        {dayjs(event.start_date).format("MMM D, YYYY")}
                      </span>
                      <Clock size={16} className="ml-4 mr-2" />
                      <span>{dayjs(event.start_date).format("h:mm A")}</span>
                    </div>

                    <div className="text-xs text-gray-500 mb-4">
                      {dayjs(event.start_date).fromNow()}
                    </div>

                    {/* Mobile Action Buttons */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          to={`/user/events-sales-overview/${event.id}`}
                          className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded font-medium text-xs text-center transition-colors">
                          Sales Overview
                        </Link>
                        <Link
                          to={`/user/events-ticket-list/${event.id}`}
                          className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded font-medium text-xs text-center transition-colors">
                          Ticket Details
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          to={`/event-details/${event.id}`}
                          className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded font-medium text-xs text-center transition-colors">
                          On Cart
                        </Link>
                        <Link
                          to="#"
                          className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded font-medium text-xs text-center transition-colors">
                          Pre-Registration
                        </Link>
                      </div>
                      <Link
                        to={`/user/scanners-event/${event.id}`}
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 rounded font-medium text-xs text-center transition-colors flex items-center justify-center">
                        <QrCode size={16} className="mr-2" />
                        Scanners
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex">
                  {/* Desktop Image */}
                  <div className="w-64 lg:w-72 h-44 flex-shrink-0 relative">
                    {event.image_url ? (
                      <>
                        <img
                          src={`${import.meta.env.VITE_IMG_URL}/${event.image_url}`}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget.nextElementSibling;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                        <div className="fallback-img hidden w-full h-full absolute top-0 left-0 items-center justify-center bg-gradient-to-br from-gray-400 to-gray-500">
                          <span className="text-2xl font-bold text-white">
                            TapKori
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-400 to-gray-500">
                        <span className="text-2xl font-bold text-white">
                          TapKori
                        </span>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div
                      className={`absolute top-3 left-3 px-3 py-1 rounded text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </div>
                  </div>

                  {/* Desktop Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 pr-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                          <Link to={`/event-details/${event.id}`}>
                            {event.title}
                          </Link>
                        </h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar size={16} className="mr-2" />
                          <span className="mr-6">
                            {dayjs(event.start_date).format(
                              "MMM D, YYYY h:mm A",
                            )}
                          </span>
                          <span className="text-gray-500">
                            ({dayjs(event.start_date).fromNow()})
                          </span>
                        </div>
                      </div>

                      <Link
                        to={`/event-details/${event.id}`}
                        className="w-10 h-10 bg-gray-100 hover:bg-amber-100 rounded flex items-center justify-center text-gray-600 hover:text-amber-600 transition-all">
                        <Eye size={20} />
                      </Link>
                    </div>

                    {/* Desktop Action Buttons */}
                    <div className="mt-auto">
                      <div className="flex flex-wrap items-center gap-3">
                        <Link
                          to={`/user/events-sales-overview/${event.id}`}
                          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-medium text-sm transition-colors">
                          Sales Overview
                        </Link>
                        <Link
                          to={`/user/events-ticket-list/${event.id}`}
                          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-medium text-sm transition-colors">
                          Ticket Details
                        </Link>
                        <Link
                          to={`/event-details/${event.id}`}
                          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-medium text-sm transition-colors">
                          On Cart
                        </Link>
                        <Link
                          to="#"
                          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-medium text-sm transition-colors">
                          Pre-Registration
                        </Link>

                        <div className="w-px h-6 bg-gray-300 mx-2" />

                        <Link
                          to={`/user/scanners-event/${event.id}`}
                          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded font-medium text-sm transition-colors flex items-center">
                          <QrCode size={16} className="mr-2" />
                          Scanners
                        </Link>
                      </div>
                    </div>
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
