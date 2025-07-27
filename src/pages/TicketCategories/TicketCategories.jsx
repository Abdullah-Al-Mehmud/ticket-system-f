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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          All Ticket Categories
        </h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        {isLoading ? (
          <div className="p-6 text-center text-gray-500">Loading ticket categories...</div>
        ) : isError ? (
          <div className="p-6 text-center text-red-500">Failed to load ticket categories.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "ID",
                    "Category Name",
                    "Event Title",
                    "Price",
                    "Sales Start",
                    "Sales End",
                    "Total Qty",
                    "Sold Qty",
                    "Actions",
                  ].map((heading, idx) => (
                    <th
                      key={idx}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fetchData?.data.map((event) => (
                  <tr key={event?.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">#{event?.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{event?.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{event?.event?.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">${event?.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{event?.sales_start}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{event?.sales_end}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{event?.total_quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{event?.sold_quantity}</td>
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
