import { ArrowLeft, Tag } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCreateTicketTypeMutation } from "../../../../store/features/ticketTypes/ticketTypesApiSlice";

const TicketTypeCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_active: true,
  });

  const [createTicketType, { isLoading }] = useCreateTicketTypeMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Ticket type name is required");
      return;
    }

    try {
      const res = await createTicketType(formData).unwrap();
      toast.success(res.message || "Ticket type created successfully!");
      navigate("/admin/ticket-types-list", { state: { refresh: true } });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create ticket type");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/admin/ticket-types-list")}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Create Ticket Type
            </h2>
            <p className="text-gray-600 text-sm">
              Add a new ticket type (e.g., General, Student, VIP)
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ticket Type Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="e.g. General, Student, VIP, Workshop"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              name="description"
              placeholder="Enter description for this ticket type"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_active"
              id="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
              Active (visible in ticket category creation)
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/ticket-types-list")}
              className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-3 px-6 rounded-lg font-medium text-white transition-transform duration-150 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-amber-600 hover:bg-amber-700"
              }`}
            >
              {isLoading ? "Creating..." : "Create Ticket Type"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketTypeCreate;