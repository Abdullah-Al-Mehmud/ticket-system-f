import React from "react";
import { useParams } from "react-router-dom";
import { useGetEventByIdQuery } from "../../../../redux/features/event/EventApiSlice";
import PageLoading from "../../../../components/LoaderComponent/PageLoading";
import exportToPDF from "../../../../../utils/exportToPDF";

const TicketList = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEventByIdQuery(id);

  if (isLoading) return <PageLoading />;

  const event = data.data;
  const tickets = event.tickets || [];
  const ticketCategories = event.ticket_categories || [];

  const getCategoryName = (catId) => {
    const category = ticketCategories.find((c) => c.id === catId);
    return category ? category.name : "Unknown Category";
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleString();
    } catch {
      return dateStr;
    }
  };

  const handlePDFExport = () => {
    const headers = [
      "Ticket ID",
      "User ID",
      "Category",
      "Quantity",
      "Status",
      "Purchased At",
    ];

    const rows = tickets.map((ticket) => [
      ticket.id,
      ticket.user_id,
      getCategoryName(ticket.ticket_category_id),
      ticket.quantity,
      ticket.status,
      formatDate(ticket.created_at),
    ]);

    exportToPDF({
      title: `Ticket List for Event: ${event.title}`,
      subtitle: `Exported on: ${new Date().toLocaleDateString()} | Total Tickets: ${
        tickets.length
      }`,
      headers,
      rows,
      fileName: `tickets_event_${event.id}.pdf`,
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Ticket List</h1>

        <button
          onClick={handlePDFExport}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-md transition duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 5v14m7-7H5" />
          </svg>
          Export PDF
        </button>
      </div>

      {tickets.length === 0 ? (
        <p className="text-gray-600 text-center">
          No tickets found for this event.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purchased At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ticket.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ticket.user_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getCategoryName(ticket.ticket_category_id)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ticket.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ticket.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(ticket.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TicketList;
