import React, { useState } from "react";
import { Eye, Edit, Trash2, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/ConfirmModel/ConfirmModal";
import TableRowSkeleton from "../../components/LoaderComponent/TableRowSkeleton";
import {
  useGetEventsQuery,
  useDeleteEventMutation,
} from "../../redux/features/event/EventApiSlice";

const AllEventsList = () => {
  const [configPage, setConfigPage] = useState({
    page: 1,
    count: 10,
    search: "",
    status: "",
    category: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, isError, refetch } = useGetEventsQuery(configPage);

  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();

  const events = data?.data || [];
  const lastPage = data?.last_page || 1;
  const currentPage = data?.current_page || 1;

  const handleDeleteClick = (id) => {
    setEventToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;
    try {
      const res = await deleteEvent(eventToDelete).unwrap();
      toast.success(res.message || "Event deleted successfully!");
      refetch();
    } catch {
      toast.error("Failed to delete event.");
    } finally {
      setIsModalOpen(false);
      setEventToDelete(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventToDelete(null);
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
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
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">All Events</h1>
            <p className="mt-2 text-gray-600">Manage all your events</p>
          </div>
          <Link
            to="/admin/create-event"
            className="bg-amber-600 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded flex items-center gap-2"
          >
            <Plus size={20} /> Create Event
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 flex gap-2 w-full flex-wrap">
              <div className="relative flex-1 min-w-[180px]">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setConfigPage((prev) => ({
                        ...prev,
                        search: search,
                        page: 1,
                      }));
                    }
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-label="Search events"
                />
              </div>

              <button
                onClick={() =>
                  setConfigPage((prev) => ({
                    ...prev,
                    search: search,
                    page: 1,
                  }))
                }
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1"
              >
                Search
              </button>

              <button
                onClick={() => {
                  setSearch("");
                  setStatus("");
                  setConfigPage((prev) => ({
                    ...prev,
                    search: "",
                    status: "",
                    page: 1,
                  }));
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
              >
                Clear
              </button>
            </div>

            <div className="flex gap-2 flex-wrap">
              <select
                value={status}
                onChange={(e) => {
                  const value = e.target.value;
                  setStatus(value);
                  setConfigPage((prev) => ({
                    ...prev,
                    status: value,
                    page: 1,
                  }));
                }}
                className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">All Status</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Live">Live</option>
                <option value="Done">Done</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              {/* <select
                value={configPage.category}
                onChange={(e) =>
                  setConfigPage((prev) => ({
                    ...prev,
                    category: e.target.value,
                    page: 1,
                  }))
                }
                className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">All Categories</option>
              </select> */}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border overflow-hidden">
          {isError ? (
            <div className="p-6 text-center text-red-500">
              Failed to load events.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {[
                      "ID",
                      "Event_Image",
                      "Event",
                      "Creator",
                      "Category",
                      "Location",
                      "Status",
                      "Start",
                      "End",
                      "Actions",
                    ].map((heading, i) => (
                      <th
                        key={i}
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {isLoading ? (
                    <TableRowSkeleton count={4} />
                  ) : events.length > 0 ? (
                    events.map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          #{event.id}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {event.image_url ? (
                            <img
                              src={`${import.meta.env.VITE_IMG_URL}/${
                                event.image_url
                              }`}
                              alt={event.title}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-semibold uppercase">
                              {event.title.charAt(0)}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <Link
                            to={`/admin/events-details/${event.id}`}
                            className="hover:underline"
                          >
                            {event.title}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {event.creator?.name}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {event.category?.name}
                        </td>
                        <td className="px-6 py-4 text-sm">{event.location}</td>
                        <td className="px-6 py-4 text-sm">
                          {getStatusBadge(event.status)}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {formatDate(event.start_date)}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {formatDate(event.end_date)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex gap-2 justify-center">
                            <Link
                              to={`/admin/events-details/${event.id}`}
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded"
                            >
                              <Eye size={16} />
                            </Link>
                            <Link
                              to={`/admin/event-edit/${event.id}`}
                              className="text-green-600 hover:text-green-800 hover:bg-green-50 p-1 rounded"
                            >
                              <Edit size={16} />
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(event.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded"
                              disabled={isDeleting}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="text-center py-12 text-gray-500"
                      >
                        No events found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {lastPage > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
            {/* Previous Button */}
            <button
              onClick={() =>
                setConfigPage((prev) => ({
                  ...prev,
                  page: Math.max(1, currentPage - 1),
                }))
              }
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm rounded-md border transition ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                  : "bg-white hover:bg-amber-100 text-gray-700 border-gray-300"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {[...Array(lastPage)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() =>
                    setConfigPage((prev) => ({ ...prev, page: pageNum }))
                  }
                  className={`px-4 py-2 text-sm rounded-md border transition ${
                    pageNum === currentPage
                      ? "bg-amber-600 text-white border-amber-600"
                      : "bg-white hover:bg-amber-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() =>
                setConfigPage((prev) => ({
                  ...prev,
                  page: Math.min(lastPage, currentPage + 1),
                }))
              }
              disabled={currentPage === lastPage}
              className={`px-4 py-2 text-sm rounded-md border transition ${
                currentPage === lastPage
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                  : "bg-white hover:bg-amber-100 text-gray-700 border-gray-300"
              }`}
            >
              Next
            </button>
          </div>
        )}
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this event?"
        />
      </div>
    </div>
  );
};

export default AllEventsList;
