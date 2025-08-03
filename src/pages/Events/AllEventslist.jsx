import React, { useEffect, useState } from "react";
import { Eye, Edit, Trash2, Plus, Search } from "lucide-react";
import {
  useGetEventsQuery,
  useDeleteEventMutation,
} from "../../redux/features/event/EventApiSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/ConfirmModel/ConfirmModal";
import TableRowSkeleton from "../../components/LoderComponent/TableRowSkeleton";

const AllEventslist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("event_name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const { data, isLoading, isError, refetch } = useGetEventsQuery();
  const events = data?.data || [];

  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setIsModalOpen(true);
  };

  const confiramDelete = async () => {
    if (!userToDelete) return;
    await handleDelete(userToDelete);
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const handleDelete = async (eventId) => {
    try {
      const res = await deleteEvent(eventId).unwrap();
      if (res.status === true) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }

      refetch();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete event. Please try again.");
    }
  };

  const filteredEvents = events
    .filter((event) => {
      const titleMatch = event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryMatch =
        categoryFilter === "all" || event.category.name === categoryFilter;
      const statusMatch =
        statusFilter === "all" || event.status === statusFilter;
      return titleMatch && categoryMatch && statusMatch;
    })
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const getStatusBadge = (status) => {
    const statusStyles = {
      Live: "bg-green-100 text-green-800 border-green-200",
      Upcoming: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Done: "bg-blue-100 text-blue-800 border-blue-200",
      Cancelled: "bg-red-100 text-red-800 border-red-200",
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true, // for AM/PM format; use false for 24-hour format
    });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const statusOptions = [];
  events.forEach((event) => {
    if (!statusOptions.includes(event.status)) {
      statusOptions.push(event.status);
    }
  });

  const categoryOptions = [];
  events.forEach((event) => {
    if (!categoryOptions.includes(event.category)) {
      categoryOptions.push(event.category.name);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">All Events</h1>
            <p className="mt-2 text-gray-600">
              Manage and track all your events in one place
            </p>
          </div>
          <Link
            to="/admin/create-event"
            className="bg-amber-600 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded transition duration-300 flex items-center gap-2"
          >
            <Plus size={20} /> Create Event
          </Link>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categoryOptions.map((category, index) => (
                    <option key={index} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table or Loading State */}
        {isError ? (
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-red-500">
            Failed to load events. Please try again later.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Event Image
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Event Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Creator
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Start Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      End Date
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {isLoading ? (
                    <TableRowSkeleton count={4} />
                  ) : (
                    filteredEvents.map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          <Link
                            className="hover:underline"
                            to={`/admin/events-details/${event.id}`}
                          >
                            #{event.id}
                          </Link>
                        </td>

                        {/* Image + Title in one cell */}
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium flex items-center gap-3">
                          {event.image_url ? (
                            <img
                              src={`${import.meta.env.VITE_IMG_URL}/${
                                event.image_url
                              }`}
                              alt={event.title}
                              className="w-8 h-8 rounded-full object-cover"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "/default-image.png";
                              }}
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-semibold uppercase">
                              {event.title.charAt(0)}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          <Link
                            className="hover:underline"
                            to={`/admin/events-details/${event.id}`}
                          >
                            {event.title}
                          </Link>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {event.creator.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {event.category.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {event.location}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {getStatusBadge(event.status)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(event.start_date)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(event.end_date)}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              to={`/admin/events-details/${event.id}`}
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded"
                              title="View"
                            >
                              <Eye size={16} />
                            </Link>
                            <Link
                              to={`/admin/event-edit/${event.id}`}
                              className="text-green-600 hover:text-green-800 hover:bg-green-50 p-1 rounded"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(event.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded"
                              title="Delete"
                              disabled={isDeleting}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confiramDelete}
          message="Are you sure you want to delete this Event?"
        />
      </div>
    </div>
  );
};

export default AllEventslist;
