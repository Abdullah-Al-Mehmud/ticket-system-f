import React, { useState } from "react";
import { Eye, Edit, Trash2, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmModal from "../../../../components/common/ConfirmModel/ConfirmModal";
import TableRowSkeleton from "../../../../components/common/LoaderComponent/TableRowSkeleton";
import {
  useGetTicketCategoriesQuery,
  useDeleteTicketCategoryMutation,
} from "../../../../store/features/ticketCategories/ticketCategoriesApiSlice";

export default function TicketCategoriesList() {
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    search: "",
  });
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useGetTicketCategoriesQuery(pageConfig);

  const [deleteTicketCategory, { isLoading: isDeleting }] =
    useDeleteTicketCategoryMutation();

  const handleDeleteClick = (id) => {
    setCategoryToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await deleteTicketCategory(categoryToDelete).unwrap();
      toast.success("Ticket category deleted successfully!");
      refetch();
    } catch {
      toast.error("Failed to delete the ticket category.");
    } finally {
      setIsModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCategoryToDelete(null);
  };

  const formatDateOnly = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Destructure pagination data
  const ticketCategories = fetchData?.data || [];
  const currentPage = fetchData?.current_page || 1;
  const lastPage = fetchData?.last_page || 1;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              All Ticket Categories
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
                  placeholder="Search by Ticket Category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setPageConfig((prev) => ({ ...prev, search, page: 1 }));
                    }
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-label="Search tickets"
                />
              </div>

              <button
                onClick={() =>
                  setPageConfig((prev) => ({ ...prev, search, page: 1 }))
                }
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1"
              >
                Search
              </button>

              <button
                onClick={() => {
                  setSearch("");
                  setPageConfig((prev) => ({
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
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {[
                    "ID",
                    "Category Name",
                    "Event Title",
                    "Price",
                    "Max Per Purchase",
                    "Sales Start",
                    "Sales End",
                    "Total Qty",
                    "Sold Qty",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <TableRowSkeleton count={4} />
                ) : ticketCategories.length > 0 ? (
                  ticketCategories.map((category) => (
                    <tr
                      key={category.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                        <Link
                          className="hover:underline"
                          to={`/admin/ticket-categories-details/${category.id}`}
                        >
                          #{category.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        <Link
                          className="hover:underline"
                          to={`/admin/ticket-categories-details/${category.id}`}
                        >
                          {category.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {category.event?.title || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        ৳{category.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {category.max_per_purchase ?? 'null'}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDateOnly(category.sales_start)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDateOnly(category.sales_end)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {category.total_quantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {category.sold_quantity}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            to={`/admin/ticket-categories-details/${category.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-md"
                            title="View"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            to={`/admin/ticket-categories-edit/${category.id}`}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-md"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(category.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-md"
                            title="Delete"
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
                      className="text-center py-6 text-sm text-gray-500"
                    >
                      No ticket categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Pagination */}
      {lastPage > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <button
            onClick={() =>
              setPageConfig((prev) => ({
                ...prev,
                page: Math.max(1, currentPage - 1),
              }))
            }
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm rounded-md border transition ${currentPage === 1
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
                  setPageConfig((prev) => ({ ...prev, page: pageNum }))
                }
                className={`px-4 py-2 text-sm rounded-md border transition ${pageNum === currentPage
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
              setPageConfig((prev) => ({
                ...prev,
                page: Math.min(lastPage, currentPage + 1),
              }))
            }
            disabled={currentPage === lastPage}
            className={`px-4 py-2 text-sm rounded-md border transition ${currentPage === lastPage
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                : "bg-white hover:bg-amber-100 text-gray-700 border-gray-300"
              }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Confirm delete modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this ticket category?"
      />
    </div>
  );
}
