import React, { useState, useEffect, useMemo } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  MoreVertical,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  useGetTicketsQuery,
  useDeleteTicketMutation,
} from "../../redux/features/tickets/ticketsApiSlice";
import toast from "react-hot-toast";

export const TicketsList = () => {
  const location = useLocation();
  const [tickets, setTickets] = useState([]);
  const [deleteTicket] = useDeleteTicketMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");

  const { data, isLoading, isError, refetch } = useGetTicketsQuery();

  useEffect(() => {
    if (data?.data) setTickets(data.data);
  }, [data]);

  console.log(data?.data)

  useEffect(() => {
    if (location.state?.refresh) {
      refetch();
    }
  }, [location.state]);

  const handleDelete = async (id) => {
    try {
      const res = await deleteTicket(id).unwrap();
      if (res.status === true) {
        toast.success(res.message || "Ticket deleted successfully!");
      } else {
        toast.error(res.message || "Failed to delete ticket");
      }
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete ticket");
    }
  };

  const handleSort = (column) => {
    setSortBy(column);
    setSortOrder((prev) =>
      sortBy === column && prev === "asc" ? "desc" : "asc"
    );
  };

  const getStatusBadge = (status) => {
    const badgeMap = {
      booked: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full border ${
          badgeMap[status] || ""
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const filteredTickets = useMemo(() => {
    return tickets
      .filter(
        (t) =>
          t.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.event.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((t) => statusFilter === "all" || t.status === statusFilter)
      .sort((a, b) => {
        const aVal =
          typeof a[sortBy] === "string" ? a[sortBy].toLowerCase() : a[sortBy];
        const bVal =
          typeof b[sortBy] === "string" ? b[sortBy].toLowerCase() : b[sortBy];
        return sortOrder === "asc"
          ? aVal > bVal
            ? 1
            : -1
          : aVal < bVal
          ? 1
          : -1;
      });
  }, [tickets, searchTerm, statusFilter, sortBy, sortOrder]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Tickets</h1>
            <p className="mt-2 text-gray-600">
              All tickets issued with event and user info.
            </p>
          </div>
          <Link
            to="/admin/tickets/create-ticket"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} /> Add Tickets
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search tickets by user or event..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="booked">Booked</option>
                <option value="refunded">Refunded</option>
                <option value="canceled">Canceled</option>
              </select>

              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter size={16} /> Filter
              </button>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Download size={16} /> Export
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {isLoading ? (
            <div className="text-center py-12 text-gray-500">
              Loading tickets...
            </div>
          ) : isError ? (
            <div className="text-center py-12 text-red-500">
              Failed to load tickets.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      {[
                        "id",
                        "user",
                        "event",
                        "ticket_quantity",
                        "price_per_ticket",
                        "Total_Price",
                        "status",
                        "purchased_at",
                      ].map((col) => (
                        <th
                          key={col}
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort(col)}
                        >
                          {col.replace("_", " ").toUpperCase()}
                          {sortBy === col && (
                            <span className="ml-1">
                              {sortOrder === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                      ))}
                      
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50">
                        <Link to={`/admin/tickets/${ticket.id}`}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            #{ticket.id}
                          </td>
                        </Link>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {ticket.user.name}
                           
                        </td>
                       
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {ticket.ticket_category.event.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {ticket.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {ticket.ticket_category.price}
                        </td>
                        <td className="px-6 py-4 text-sm">
                         ${ticket.quantity * ticket.ticket_category.price }
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {getStatusBadge(ticket.status)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(ticket.created_at)}
                        </td>
                      
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredTickets.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No tickets found matching your criteria.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketsList;
