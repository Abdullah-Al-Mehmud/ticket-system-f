import React, { useState } from "react";
import { CalendarDays, MapPin, Users, Clock } from "lucide-react";
import TableRowSkeleton from "../../../components/LoderComponent/TableRowSkeleton";
import { Link } from "react-router-dom";
import { useGetOrganizerEventsQuery } from "../../../redux/features/event/EventApiSlice";

function UserOrganizedEventForm() {
  const { data, isLoading, isError } = useGetOrganizerEventsQuery();
  const [activeTab, setActiveTab] = useState("All");

  const statusTabs = ["All", "Upcoming", "Live", "Done", "Cancelled"];

  const filteredEvents = data?.data?.filter(event => {
    if (activeTab === "All") return true;
    return event.status === activeTab;
  }) || [];

  return (
    <>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-amber-200">
          <h2 className="text-xl font-semibold text-amber-900">
            My Events
          </h2>
        </div>

        {/* Status Tabs */}
        <div className="px-6 py-4 border-b border-amber-200 bg-amber-50">
          <div className="flex flex-wrap gap-2">
            {statusTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-amber-700 hover:bg-amber-100 bg-white border border-amber-200"
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
            <div className="text-center py-8 text-amber-600">
              <TableRowSkeleton count={2} />
            </div>
          )}

          {isError && (
            <div className="text-center py-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                Failed to load events. Please try again.
              </div>
            </div>
          )}

          {!isLoading && !isError && filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-amber-700">
                <Users className="w-12 h-12 mx-auto mb-4 text-amber-400" />
                <p className="text-lg font-medium mb-2">No Events Found</p>
                <p className="text-sm">
                  {activeTab === "All" 
                    ? "You haven't created any events yet." 
                    : `No ${activeTab.toLowerCase()} events found.`}
                </p>
              </div>
            </div>
          )}

          {/* Event Grid */}
          {!isLoading && !isError && filteredEvents.length > 0 && (
            <div className="max-h-[600px] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white border border-amber-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
                  >
                    {/* Event Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image || "/api/placeholder/400/200"}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = "/api/placeholder/400/200";
                        }}
                      />
                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${
                            event.status === "Live"
                              ? "bg-green-500/90 text-white"
                              : event.status === "Upcoming"
                              ? "bg-blue-500/90 text-white"
                              : event.status === "Done"
                              ? "bg-gray-500/90 text-white"
                              : "bg-red-500/90 text-white"
                          }`}
                        >
                          {event.status}
                        </span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-amber-900 mb-3 line-clamp-2 leading-tight">
                        {event.title}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-amber-700">
                          <Users className="w-4 h-4 mr-3 text-amber-500 flex-shrink-0" />
                          <span className="font-medium">{event.category?.name || "N/A"}</span>
                        </div>

                        <div className="flex items-center text-sm text-amber-700">
                          <MapPin className="w-4 h-4 mr-3 text-amber-500 flex-shrink-0" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>

                        <div className="flex items-center text-sm text-amber-700">
                          <CalendarDays className="w-4 h-4 mr-3 text-amber-500 flex-shrink-0" />
                          <span className="line-clamp-1">
                            {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center text-sm text-amber-700">
                          <Clock className="w-4 h-4 mr-3 text-amber-500 flex-shrink-0" />
                          <span>
                            {new Date(event.start_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link
                        to={`/event-details/${event.id}`}
                        className="block w-full bg-amber-600 text-white text-center px-4 py-3 rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                        title="View Event"
                      >
                        View Event Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserOrganizedEventForm;