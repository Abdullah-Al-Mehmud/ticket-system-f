import { Edit, Eye, Plus, Search, Trash2, Tag } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ConfirmModal from "@/components/common/confirmModel/ConfirmModal";
import TableRowSkeleton from "@/components/common/loaderComponent/TableRowSkeleton";
import {
  useDeleteTicketTypeMutation,
  useGetTicketTypesQuery,
} from "../../../../store/features/ticketTypes/ticketTypesApiSlice";

export default function TicketTypesList() {
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    search: "",
  });
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketTypeToDelete, setTicketTypeToDelete] = useState(null);

  const { data: fetchData, isLoading, refetch } = useGetTicketTypesQuery(pageConfig);

  const [deleteTicketType, { isLoading: isDeleting }] = useDeleteTicketTypeMutation();

  const handleDeleteClick = (id) => {
    setTicketTypeToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!ticketTypeToDelete) return;
    try {
      await deleteTicketType(ticketTypeToDelete).unwrap();
      toast.success("Ticket type deleted successfully!");
      refetch();
    } catch {
      toast.error("Failed to delete the ticket type.");
    } finally {
      setIsModalOpen(false);
      setTicketTypeToDelete(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTicketTypeToDelete(null);
  };

  const ticketTypes = fetchData?.data || [];
  const currentPage = fetchData?.current_page || 1;
  const lastPage = fetchData?.last_page || 1;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              All Ticket Types
            </h1>
            <p className="mt-2 text-gray-600">
              Manage ticket types (e.g., General, Student, VIP)
            </p>
          </div>
          <Link
            to="/admin/ticket-types-create"
            className="bg-amber-600 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded flex items-center gap-2"
          >
            <Plus size={20} /> Create Ticket Type
          </Link>
        </div>

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
                  placeholder="Search by Ticket Type..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setPageConfig((prev) => ({ ...prev, search, page: 1 }));
                    }
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                onClick={() =>
                  setPageConfig((prev) => ({ ...prev, search, page: 1 }))
                }
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Search
              </button>

              <button
                onClick={() => {
                  setSearch("");
                  setPageConfig((prev) => ({
                    ...prev,
                    search: "",
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

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["ID", "Name", "Description", "Status", "Created At", "Actions"].map((header) => (
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
                ) : ticketTypes.length > 0 ? (
                  ticketTypes.map((ticketType) => (
                    <tr
                      key={ticketType.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                        <Link
                          className="hover:underline"
                          to={`/admin/ticket-types-list/${ticketType.id}`}
                        >
                          #{ticketType.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-amber-600" />
                          {ticketType.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {ticketType.description || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            ticketType.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {ticketType.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {ticketType.created_at
                          ? new Date(ticketType.created_at).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            to={`/admin/ticket-types-list/${ticketType.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-md"
                            title="View"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            to={`/admin/ticket-types-edit/${ticketType.id}`}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-md"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(ticketType.id)}
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
                      colSpan="6"
                      className="text-center py-6 text-sm text-gray-500"
                    >
                      No ticket types found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
                  setPageConfig((prev) => ({ ...prev, page: pageNum }))
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
              setPageConfig((prev) => ({
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
        message="Are you sure you want to delete this ticket type?"
      />
    </div>
  );
}