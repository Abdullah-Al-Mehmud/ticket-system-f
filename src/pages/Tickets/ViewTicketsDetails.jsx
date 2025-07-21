import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetTicketByIdQuery,
  useDeleteTicketMutation,
} from "../../redux/features/tickets/ticketsApiSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
  Hash,
  Calendar,
  Activity,
  Trash2,
  Pencil,
  Ticket,
  User,
  DollarSign,
  Layers,
} from "lucide-react";

const ViewTicketsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetTicketByIdQuery(id);
  const [deleteTicket] = useDeleteTicketMutation();

  const ticket = data?.data;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await deleteTicket(ticket.id).unwrap();
        toast.success("Ticket deleted successfully");
        navigate("/admin/tickets", { state: { refresh: true } });
      } catch (err) {
        toast.error(err?.data?.message || "Failed to delete ticket");
        console.error("❌ Delete Error:", err);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/admin/tickets/edit/${ticket.id}`);
  };

  if (isLoading)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  if (error || !ticket)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load ticket details.
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Ticket Details
            </h1>
            <p className="text-gray-600 text-sm">Overview of ticket</p>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant={
                ticket.status === "booked"
                  ? "outline"
                  : ticket.status === "cancelled"
                  ? "destructive"
                  : "secondary"
              }
              className="capitalize px-3 py-1"
            >
              {ticket.status}
            </Badge>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              title="Edit Ticket"
              className="text-blue-600 hover:bg-blue-100"
            >
              <Pencil size={18} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              title="Delete Ticket"
              className="text-red-600 hover:bg-red-100"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="bg-white border-b">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Ticket className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mt-1">
                  Ticket ID: #{ticket.id}
                </p>
                <CardTitle className="text-xl text-gray-900">
                  {ticket?.event?.title}
                </CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Info
              label="Ticket Quantity"
              icon={<Layers />}
              value={ticket.ticket_quantity}
            />
              <Info
                label="Status"
                icon={<Ticket />}
                value={ticket.status}
                className="capitalize"
              />
            <Info
              label="Price per Ticket"
              icon={<DollarSign />}
              value={`$${ticket.price_per_ticket}`}
            />
            <Info
              label="Total Ticket Price"
              icon={<DollarSign />}
              value={`$${ticket.price_per_ticket * ticket.ticket_quantity}`}
            />
            <Info
              label="Purchased At"
              icon={<Calendar />}
              value={new Date(ticket.purchased_at).toLocaleString()}
            />
            <Info
              label="Created At"
              icon={<Calendar />}
              value={new Date(ticket.created_at).toLocaleString()}
            />
            {/* <Info
              label="Updated At"
              icon={<Activity />}
              value={new Date(ticket.updated_at).toLocaleString()}
            /> */}

            {/* User Info */}
            <Info label="User Name" icon={<User />} value={ticket.user?.name} />
            <Info
              label="User Email"
              icon={<User />}
              value={ticket.user?.email}
            />

            {/* Event Info */}
            <Info
              label="Event Title"
              icon={<Ticket />}
              value={ticket.event?.title}
            />
            <Info
              label="Event Location"
              icon={<Ticket />}
              value={ticket.event?.location}
            />
            <Info
              label="Category"
              icon={<Hash />}
              value={ticket.event?.category?.name}
            />
            <Info
              label="Event Status"
              icon={<Badge />}
              value={ticket.event?.status}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// 🔹 Info Component
const Info = ({ label, value, icon, className = "" }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2 text-sm text-gray-500">
      {icon}
      <span>{label}</span>
    </div>
    <p className={`text-gray-900 ${className}`}>{value}</p>
  </div>
);

export default ViewTicketsDetails;
