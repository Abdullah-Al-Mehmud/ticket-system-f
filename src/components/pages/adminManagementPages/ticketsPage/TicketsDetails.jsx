import PageLoading from "@/components/common/loaderComponent/PageLoading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, Edit, Hash, Layers, Ticket } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTicketByIdQuery } from "../../../../store/features/tickets/ticketsApiSlice";

const TicketsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetTicketByIdQuery(id);
  const ticket = data?.data;

  const handleEdit = () => {
    navigate(`/admin/tickets-edit/${ticket.ticket_id}`);
  };

  if (isLoading)
    return (
      <p className="text-center text-gray-500 mt-10">
        <PageLoading />
      </p>
    );

  if (error || !ticket)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load ticket details.
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Ticket Details
            </h1>
            <p className="text-gray-600 text-sm">
              Details for ticket #{ticket.ticket_number}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant={
                ticket.status === "Confirmed"
                  ? "secondary"
                  : ticket.status === "Cancelled"
                    ? "destructive"
                    : "outline"
              }
              className="capitalize px-3 py-1">
              {ticket.status}
            </Badge>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              title="Edit Ticket"
              className="text-blue-600 hover:bg-blue-100">
              <Edit size={18} />
            </Button>
          </div>
        </div>

        {/* Table View */}
        <Card>
          <CardHeader className="bg-white border-b">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Ticket className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">
                  {ticket.event?.title}
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Ticket Number: {ticket.ticket_number}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="overflow-x-auto p-4">
            <table className="w-full text-sm text-left text-gray-700">
              <tbody>
                <TableRow
                  label="Ticket ID"
                  value={ticket.ticket_id}
                  icon={<Hash size={16} />}
                />
                <TableRow
                  label="Ticket Number"
                  value={ticket.ticket_number}
                  icon={<Ticket size={16} />}
                />
                <TableRow
                  label="Quantity"
                  value={ticket.quantity}
                  icon={<Layers size={16} />}
                />
                <TableRow
                  label="Status"
                  value={ticket.status}
                  icon={<Ticket size={16} />}
                />
                <TableRow
                  label="Price per Ticket"
                  value={`$${ticket.price_per_ticket}`}
                  icon={<DollarSign size={16} />}
                />
                <TableRow
                  label="Total Price"
                  value={`$${ticket.total_price}`}
                  icon={<DollarSign size={16} />}
                />
                <TableRow
                  label="Event Title"
                  value={ticket.event?.title}
                  icon={<Ticket size={16} />}
                />
                <TableRow
                  label="Event Location"
                  value={ticket.event?.location}
                  icon={<Ticket size={16} />}
                />
                <TableRow
                  label="Event Category"
                  value={ticket.event?.category?.name}
                  icon={<Hash size={16} />}
                />
                <TableRow
                  label="Start Date"
                  value={formatDate(ticket.event?.start_date)}
                  icon={<Calendar size={16} />}
                />
                <TableRow
                  label="End Date"
                  value={formatDate(ticket.event?.end_date)}
                  icon={<Calendar size={16} />}
                />
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// 🔹 Helper Components
const TableRow = ({ label, value, icon }) => (
  <tr className="border-b">
    <th className="py-2 pr-4 whitespace-nowrap w-1/4 flex items-center gap-2 text-gray-500">
      {icon}
      {label}
    </th>
    <td className="py-2">{value}</td>
  </tr>
);

const formatDate = (dateStr) =>
  dateStr ? new Date(dateStr).toLocaleString() : "N/A";

export default TicketsDetails;
