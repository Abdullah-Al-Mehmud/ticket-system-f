import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import {
  useDeleteTicketCategoryMutation,
  useGetTicketCategoriesQuery,
} from "../../redux/features/ticketcategories/ticketCategoriesApiSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function TicketCategories() {
  const { data: fetchData, isLoading, isError } = useGetTicketCategoriesQuery();
  const [deleteTicketCategory, { isLoading: isDeleting }] =
    useDeleteTicketCategoryMutation();

  const handleDeleteEvent = async (id) => {
    try {
      await deleteTicketCategory(id).unwrap();
      toast.success("Ticket category deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete the ticket category.");
    }
  };

  // IsLoading
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-dashed border-amber-600 rounded-full animate-spin"></div>
            <div className="absolute inset-4 bg-amber-600 rounded-full animate-ping"></div>
          </div>
          <p className="text-white text-lg font-semibold animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  function formatDateOnlyPretty(dateString) {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600 text-center font-medium">
        Failed to load ticket categories.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          All Ticket Categories
        </h1>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  category Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Event Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  sales_start
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  sales_end
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  total_quantity
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  sold_quantity
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fetchData?.data.map((event, index) => (
                <tr
                  key={event?.id}
                  className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{event?.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {event?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {event?.event?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {event?.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDateOnlyPretty(event?.sales_start)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDateOnlyPretty(event?.sales_end)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {event?.total_quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {event?.sold_quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewEvent(event.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View">
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEditEvent(event.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fetchData?.data.map((event) => (
                  <tr
                    key={event?.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                      <Link to={`/admin/ticket-categories/${event.id}`}>
                        #{event?.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <Link to={`/admin/ticket-categories/${event.id}`}>
                        {event?.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {event?.event?.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      ${event?.price}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {event?.sales_start}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {event?.sales_end}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {event?.total_quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {event?.sold_quantity}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/ticket-categories/${event.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-md"
                          title="View"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          to={`/admin/ticket-categories/${event.id}/edit`}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-md"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-md"
                          title="Delete"
                          disabled={isDeleting}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {fetchData?.data?.length === 0 && (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-6 text-sm text-gray-500"
                    >
                      No ticket categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
