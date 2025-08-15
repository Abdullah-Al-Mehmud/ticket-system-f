import React, { useEffect, useState } from "react";
import { Eye, Trash2, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useGetTicketsQuery,
  useDeleteTicketMutation,
} from "../../../../store/features/tickets/ticketsApiSlice";
import TableRowSkeleton from "../../../../components/common/loaderComponent/TableRowSkeleton";
import ConfirmModal from "../../../../components/common/confirmModel/ConfirmModal";

const TicketsList = () => {
  const location = useLocation();
  const [configPage, setConfigPage] = useState({
    page: 1,
    count: 10,
    search: "",
    status: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, isError, refetch } = useGetTicketsQuery(configPage);

  const [deleteTicket, { isLoading: isDeleting }] = useDeleteTicketMutation();

  const tickets = data?.data || [];
  const lastPage = data?.last_page || 1;
  const currentPage = data?.current_page || 1;
  useEffect(() => {
    if (location.state?.refresh) {
      refetch();
    }
  }, [location.state, refetch]);
  const handleDeleteClick = (id) => {
    setTicketToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!ticketToDelete) return;
    try {
      const res = await deleteTicket(ticketToDelete).unwrap();
      toast.success(res.message || "Ticket deleted successfully!");
      refetch();
    } catch {
      toast.error("Failed to delete ticket.");
    } finally {
      setIsModalOpen(false);
      setTicketToDelete(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTicketToDelete(null);
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
      booked: "bg-green-100 text-green-800 border-green-200",
      refunded: "bg-yellow-100 text-yellow-800 border-yellow-200",
      canceled: "bg-red-100 text-red-800 border-red-200",
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              All Tickets
            </h1>
            <p className="mt-2 text-gray-600">
              Manage all tickets with user and event info
            </p>
          </div>
          {/* <Link
            to="/admin/tickets-create"
            className="bg-amber-600 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded flex items-center gap-2"
          >
            <Plus size={20} /> Create Ticket
          </Link> */}
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
                  placeholder="Search by user or event..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setConfigPage((prev) => ({ ...prev, search, page: 1 }));
                    }
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-label="Search tickets"
                />
              </div>

              <button
                onClick={() =>
                  setConfigPage((prev) => ({ ...prev, search, page: 1 }))
                }
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium"
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
              className="w-full sm:w-48 px-4 py-3 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="booked">Booked</option>
              <option value="refunded">Refunded</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border overflow-hidden">
          {isError ? (
            <div className="p-6 text-center text-red-500">
              Failed to load tickets.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {[
                      "ID",
                      "User",
                      "Event",
                      "Quantity",
                      "Price per Ticket",
                      "Total Price",
                      "Status",
                      "Purchased At",
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
                  ) : tickets.length > 0 ? (
                    tickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          #{ticket.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {ticket.user?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {ticket.ticket_category?.event?.title || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {ticket.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          ৳{ticket.ticket_category?.price || 0}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          ৳
                          {(
                            ticket.quantity *
                            (ticket.ticket_category?.price || 0)
                          ).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {getStatusBadge(ticket.status)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(ticket.created_at)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex gap-2 justify-center">
                            <Link
                              to={`/admin/tickets-details/${ticket.id}`}
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded"
                            >
                              <Eye size={16} />
                            </Link>
                            {/* <Link
                              to={`/admin/ticket-edit/${ticket.id}`}
                              className="text-green-600 hover:text-green-800 hover:bg-green-50 p-1 rounded"
                            >
                              <Edit size={16} />
                            </Link> */}
                            <button
                              onClick={() => handleDeleteClick(ticket.id)}
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
                        No tickets found.
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
          message="Are you sure you want to delete this ticket?"
        />
      </div>
    </div>
  );
};

export default TicketsList;
