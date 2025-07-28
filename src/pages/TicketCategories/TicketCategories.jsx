import React, { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import {
  useDeleteTicketCategoryMutation,
  useGetTicketCategoriesQuery,
} from "../../redux/features/ticketcategories/ticketCategoriesApiSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import DataLoadingLoader from "../../components/LoderComponent/PageLoading";
import PageLoading from "../../components/LoderComponent/PageLoading";
import ConfirmModal from "../../components/ConfirmModel/ConfirmModal";

export default function TicketCategories() {
  const { data: fetchData, isLoading, isError } = useGetTicketCategoriesQuery();
  const [deleteTicketCategory, { isLoading: isDeleting }] =
    useDeleteTicketCategoryMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setIsModalOpen(true);
  };

  const confiramDelete = async () => {
    if (!userToDelete) return;
    await handleDeleteEvent(userToDelete);
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteTicketCategory(id).unwrap();
      toast.success("Ticket category deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete the ticket category.");
    }
  };

  const formatDateOnly = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <PageLoading />;
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase">
                  Category Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase">
                  Event Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase">
                  Sales Start
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase">
                  Sales End
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase">
                  Total Qty
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase">
                  Sold Qty
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fetchData?.data?.length > 0 ? (
                fetchData.data.map((event) => (
                  <tr
                    key={event?.id}
                    className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                      <Link
                        className="hover:underline"
                        to={`/admin/ticket-categories/${event.id}`}>
                        #{event?.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <Link className="hover:underline" to={`/admin/ticket-categories/${event.id}`}>
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
                      {formatDateOnly(event?.sales_start)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDateOnly(event?.sales_end)}
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
                          title="View">
                          <Eye size={16} />
                        </Link>
                        <Link
                          to={`/admin/ticket-categories/${event.id}/edit`}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-md"
                          title="Edit">
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(event.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-md"
                          title="Delete"
                          disabled={isDeleting}>
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
                    className="text-center py-6 text-sm text-gray-500">
                    No ticket categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <ConfirmModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={confiramDelete}
            message="Are you sure you want to delete this Ticket Categories?"
          />
        </div>
      </div>
    </div>
  );
}
