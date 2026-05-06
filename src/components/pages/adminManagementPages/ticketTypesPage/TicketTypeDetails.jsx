import { ArrowLeft, Edit, Tag, Calendar, FileText } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useGetTicketTypeByIdQuery,
  useDeleteTicketTypeMutation,
} from "../../../../store/features/ticketTypes/ticketTypesApiSlice";
import PageLoading from "@/components/common/loaderComponent/PageLoading";
import ConfirmModal from "@/components/common/confirmModel/ConfirmModal";
import { useState } from "react";

const TicketTypeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useGetTicketTypeByIdQuery(id);
  const [deleteTicketType, { isLoading: isDeleting }] = useDeleteTicketTypeMutation();

  const ticketType = data?.data;

  const handleDelete = async () => {
    try {
      await deleteTicketType(id).unwrap();
      toast.success("Ticket type deleted successfully!");
      navigate("/admin/ticket-types-list");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete ticket type");
    } finally {
      setIsModalOpen(false);
    }
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError || !ticketType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">
            Unable to load ticket type details.
          </p>
          <button
            onClick={() => navigate("/admin/ticket-types-list")}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/admin/ticket-types-list")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Ticket Types
        </button>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Tag className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {ticketType.name}
                  </h1>
                  <p className="text-amber-100 text-sm">
                    Ticket Type Details
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/admin/ticket-types-edit/${id}`)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Tag className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Name</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {ticketType.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      ticketType.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {ticketType.is_active ? "Active" : "Inactive"}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Status</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <FileText className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Description</p>
                    <p className="text-gray-900">
                      {ticketType.description || "No description provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Created At</p>
                    <p className="text-gray-900">
                      {ticketType.created_at
                        ? new Date(ticketType.created_at).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete "${ticketType.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default TicketTypeDetails;