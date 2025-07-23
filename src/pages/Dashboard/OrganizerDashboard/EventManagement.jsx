import React, { useState } from "react";
import {
  Eye,
  Plus,
} from "lucide-react";
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
      className={`px-2 py-1 text-xs font-medium rounded ${
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


        {/* Table Content */}
        {isLoading ? (
          <div className="bg-white border p-6 text-center text-gray-500">
            Loading events...
          </div>
        ) : isError ? (
          <div className="bg-white border p-6 text-center text-red-500">
            Failed to load events. Please try again later.
          </div>
        ) : (
          <div className="bg-white border rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      #{event.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {getCategoryBadge(event.category.name)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {getStatusBadge(event.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(event.start_date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {event.location}
                    </td>
                    <td className="px-6 py-4 text-sm text-green-600">
                      ${event.ticket_price}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/organizer/events-details/${event.id}`}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded"
                          title="View"
                        >
                          <Eye size={16} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventManagement;
