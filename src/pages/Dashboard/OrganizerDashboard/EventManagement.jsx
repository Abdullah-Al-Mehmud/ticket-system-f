import React, { useState } from "react";
import { Eye, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetOrganizerEventsQuery } from "../../../redux/features/event/EventApiSlice";

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Status badge
const getStatusBadge = (status) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
    upcoming: "bg-purple-100 text-purple-800 border-purple-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full border ${
        statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-200"
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Category badge
const getCategoryBadge = (category) => {
  const categoryColors = {
    Sports: "bg-blue-100 text-blue-800",
    Music: "bg-pink-100 text-pink-800",
    Business: "bg-indigo-100 text-indigo-800",
    Education: "bg-orange-100 text-orange-800",
    Tech: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${
        categoryColors[category] || "bg-gray-100 text-gray-800"
      }`}
    >
      {category}
    </span>
  );
};

const EventManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data, isLoading, isError } = useGetOrganizerEventsQuery();
  const events = data?.data || [];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || event.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || event.category.name === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">All Events</h1>
            <p className="mt-2 text-gray-600">
              Manage and track all your events in one place
            </p>
          </div>
          <Link
            to="/organizer/create-event"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} /> Create Event
          </Link>
        </div>

        {/* Event Cards */}
        {isLoading ? (
          <div className="bg-white border p-6 text-center text-gray-500">
            Loading events...
          </div>
        ) : isError ? (
          <div className="bg-white border p-6 text-center text-red-500">
            Failed to load events. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Event Image (Placeholder if no image URL) */}
                {event.image_url ? (
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
                )}

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{event.title}</h2>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm text-gray-500">
                      {getCategoryBadge(event.category.name)}
                    </div>
                    <div>{getStatusBadge(event.status)}</div>
                  </div>

                  <p className="text-sm text-gray-600 mt-2">{event.event_description}</p>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <span>Start: {formatDate(event.start_date)}</span>
                    </div>
                    <div className="text-sm text-green-600 font-semibold">
                      ${event.ticket_price}
                    </div>
                  </div>

                  {/* View Button */}
                  <div className="mt-4 flex justify-center">
                    <Link
                      to={`/organizer/events-details/${event.id}`}
                      className="bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                    >
                      <Eye size={16} />
                      View Details
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
};

export default EventManagement;
