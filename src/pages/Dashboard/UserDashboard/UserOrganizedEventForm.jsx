import React, { useState } from "react";
import { CalendarDays, MapPin, Users, Clock } from "lucide-react";
import TableRowSkeleton from "../../../components/LoaderComponent/TableRowSkeleton";
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
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-amber-200">
          <h2 className="text-lg font-medium text-amber-900">
            My Events
          </h2>
        </div>

        {/* Status Tabs */}
        <div className="px-6 py-3 bg-amber-100 border-b border-amber-200">
          <div className="flex space-x-1 ">
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
              {activeTab === "All" ? "No events found." : `No ${activeTab.toLowerCase()} events found.`}
            </div>
          )}

          {/* Event Cards */}
          {!isLoading && !isError && filteredEvents.length > 0 && (
            <div className="max-h-[500px] overflow-y-auto space-y-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white border border-amber-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex">
                    {/* Event Image */}
                    <div className="w-48 h-full">
                      <img
                        src={event.image_url }
                        alt={event.title}
                        className="w-full h-full object-cover rounded-l-lg"
                      />
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-amber-900 line-clamp-1">
                          {event.title}
                        </h3>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            event.status === "Live"
                              ? "bg-green-100 text-green-800"
                              : event.status === "Upcoming"
                              ? "bg-blue-100 text-blue-800"
                              : event.status === "Done"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {event.status}
                        </span>
                      </div>

                      

                      <div className="flex justify-end ">
                        <Link
                          to={`/event-details/${event.id}`}
                          className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
                          title="View Event"
                        >
                          View Event
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserOrganizedEventForm;