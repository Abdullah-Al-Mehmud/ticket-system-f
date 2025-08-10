import React from "react";
import { useParams } from "react-router-dom";
import { useGetEventByIdQuery } from "../../../../store/features/event/EventApiSlice";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Ticket, Banknote, Gift, ChartBar } from "lucide-react";
const MetricCard = ({ title, value, icon, colorClass = "bg-white", textColorClass = "text-gray-900" }) => (
  <Card className={cn("duration-200", colorClass)}>
    <CardContent className="flex items-center justify-between space-x-4">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className={cn("text-2xl font-bold", textColorClass)}>{value}</p>
      </div>
      {icon && <div className="text-3xl opacity-80">{icon}</div>}
    </CardContent>
  </Card>
);
const EventSalesOverview = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetEventByIdQuery(id);

  if (isLoading) return <p >loading</p>;

  if (isError || !data?.data) {
    return <p>Failed to load sales data</p>;
  }

  const event = data.data;
  const ticketCategories = event.ticket_categories || [];
  const tickets = event.tickets || [];

  const totalTickets = ticketCategories.reduce((sum, cat) => sum + cat.total_quantity, 0);
  const totalSold = ticketCategories.reduce((sum, cat) => sum + cat.sold_quantity, 0);

  const paidTicketsList = tickets.filter((t) => t.status === "Confirmed");
  const paidTickets = paidTicketsList.reduce((sum, t) => sum + t.quantity, 0);

  const complementaryTickets = totalSold - paidTickets;

  let totalAmount = 0;
  paidTicketsList.forEach((ticket) => {
    const category = ticketCategories.find((cat) => cat.id === ticket.ticket_category_id);
    if (category) {
      totalAmount += ticket.quantity * parseFloat(category.price);
    }
  });

  const formatCurrency = (amount) => `৳${amount.toLocaleString()}`;

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <Card className="border border-gray-200 rounded p-6">
        <CardContent className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sales Overview</h1>
            <p className="text-gray-600">Real-time ticket sales analytics and performance metrics</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Overall Progress</div>
            <div className="text-3xl font-bold text-amber-600">
              {totalTickets > 0 ? Math.round((totalSold / totalTickets) * 100) : 0}%
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title="Total Tickets"
          value={totalTickets.toLocaleString()}
          icon={<Ticket />}
          colorClass="bg-gradient-to-br from-blue-50 to-blue-100"
          textColorClass="text-blue-900"
        />
        <MetricCard
          title="Total Sold"
          value={totalSold.toLocaleString()}
          icon={<ChartBar />}
          colorClass="bg-gradient-to-br from-green-50 to-green-100"
          textColorClass="text-green-900"
        />
        <MetricCard
          title="Paid Tickets"
          value={paidTickets.toLocaleString()}
          icon={<Banknote />}
          colorClass="bg-gradient-to-br from-emerald-50 to-emerald-100"
          textColorClass="text-emerald-900"
        />
        <MetricCard
          title="Complimentary"
          value={complementaryTickets.toLocaleString()}
          icon={<Gift />}
          colorClass="bg-gradient-to-br from-purple-50 to-purple-100"
          textColorClass="text-purple-900"
        />
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(totalAmount)}
          icon={<Banknote />}
          colorClass="bg-gradient-to-br from-yellow-50 to-yellow-100"
          textColorClass="text-yellow-900"
        />
      </div>

      {/* Category Breakdown */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-900">🎟 Ticket Categories</h2>
          <span className="text-sm font-medium text-gray-500">
            {ticketCategories.length} categories available
          </span>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ticketCategories.map((category) => {
            const sold = category.sold_quantity;
            const total = category.total_quantity;
            const left = total - sold;
            const soldPercent = total > 0 ? Math.round((sold / total) * 100) : 0;

            return (
              <div
                key={category.id}
                className="bg-white transition rounded p-5 border"
              >
                {/* Category Name */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {category.name}
                </h3>

                {/* Price */}
                <p className="text-gray-600 text-sm mb-3">
                  Price: <span className="font-medium text-green-600">৳{category.price}</span>
                </p>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Sold</span>
                    <span>{soldPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: `${soldPercent}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Sold: {sold}</span>
                  <span>Left: {left}</span>
                  <span>Total: {total}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>


      {/* Empty State */}
      {ticketCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No ticket categories found</h3>
          <p className="text-gray-600">Create ticket categories to start tracking sales.</p>
        </div>
      )}
    </div>
  );
};

export default EventSalesOverview;
