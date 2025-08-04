import React from "react";
import { useParams } from "react-router-dom";
import { useGetEventByIdQuery } from "../../../../redux/features/event/EventApiSlice";
import PageLoading from "../../../../components/LoaderComponent/PageLoading";

const ErrorMessage = ({ message = "Something went wrong" }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">{message}</p>
        </div>
      </div>
    </div>
  </div>
);

const MetricCard = ({
  title,
  value,
  icon,
  colorClass = "bg-white",
  textColorClass = "text-gray-900",
}) => (
  <div
    className={`${colorClass} border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className={`text-2xl font-bold ${textColorClass}`}>{value}</p>
      </div>
      {icon && <div className="text-2xl opacity-70">{icon}</div>}
    </div>
  </div>
);

const ProgressBar = ({ percentage, colorClass = "bg-blue-600" }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
    <div
      className={`${colorClass} h-2.5 rounded-full transition-all duration-700 ease-out`}
      style={{ width: `${Math.min(percentage, 100)}%` }}
    />
  </div>
);

const CategoryCard = ({ category, sold, total, left, soldPercent, price }) => {
  // Dynamic color based on performance
  const getColorTheme = (percent) => {
    if (percent >= 75)
      return {
        bg: "bg-green-50",
        border: "border-green-200",
        title: "text-green-900",
        progress: "bg-green-600",
        badge: "bg-green-100 text-green-800",
      };
    if (percent >= 50)
      return {
        bg: "bg-blue-50",
        border: "border-blue-200",
        title: "text-blue-900",
        progress: "bg-blue-600",
        badge: "bg-blue-100 text-blue-800",
      };
    if (percent >= 25)
      return {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        title: "text-yellow-900",
        progress: "bg-yellow-600",
        badge: "bg-yellow-100 text-yellow-800",
      };
    return {
      bg: "bg-red-50",
      border: "border-red-200",
      title: "text-red-900",
      progress: "bg-red-600",
      badge: "bg-red-100 text-red-800",
    };
  };

  const theme = getColorTheme(soldPercent);

  return (
    <div
      className={`${theme.bg} ${theme.border} border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className={`font-semibold text-lg ${theme.title} mb-1`}>
            {category.name}
          </h4>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${theme.badge}`}
          >
            ৳{parseFloat(price).toLocaleString()}
          </span>
        </div>
        <div className={`text-right ${theme.title}`}>
          <div className="text-2xl font-bold">{soldPercent}%</div>
          <div className="text-xs text-gray-600">completion</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className={`text-xl font-bold ${theme.title}`}>{sold}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">
            Sold
          </div>
        </div>
        <div className="text-center">
          <div className={`text-xl font-bold ${theme.title}`}>{left}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">
            Available
          </div>
        </div>
        <div className="text-center">
          <div className={`text-xl font-bold ${theme.title}`}>{total}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">
            Total
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Sales Progress</span>
          <span className={`font-medium ${theme.title}`}>
            {sold}/{total}
          </span>
        </div>
        <ProgressBar percentage={soldPercent} colorClass={theme.progress} />
      </div>
    </div>
  );
};

const SalesOverview = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetEventByIdQuery(id);

  // Loading state
  if (isLoading) return <PageLoading />;

  // Error state
  if (isError || !data?.data) {
    return <ErrorMessage message="Failed to load sales data" />;
  }

  const event = data.data;
  const ticketCategories = event.ticket_categories || [];
  const tickets = event.tickets || [];

  // Calculate metrics (keeping original logic intact)
  const totalTickets = ticketCategories.reduce(
    (sum, cat) => sum + cat.total_quantity,
    0
  );

  const totalSold = ticketCategories.reduce(
    (sum, cat) => sum + cat.sold_quantity,
    0
  );

  const paidTickets = tickets
    .filter((t) => t.status === "Confirmed")
    .reduce((sum, t) => sum + t.quantity, 0);

  const complementaryTickets = totalSold - paidTickets;

  let totalAmount = 0;
  ticketCategories.forEach((cat) => {
    const compQtyInCat = tickets
      .filter((t) => t.ticket_category_id === cat.id)
      .reduce((sum, t) => sum + t.quantity, 0);

    const paidQty = cat.sold_quantity - compQtyInCat;
    totalAmount += paidQty * parseFloat(cat.price);
  });

  const formatCurrency = (amount) => `৳${amount.toLocaleString()}`;

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Sales Overview
            </h1>
            <p className="text-gray-600">
              Real-time ticket sales analytics and performance metrics
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Overall Progress</div>
            <div className="text-3xl font-bold text-blue-600">
              {totalTickets > 0
                ? Math.round((totalSold / totalTickets) * 100)
                : 0}
              %
            </div>
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title="Total Tickets"
          value={totalTickets.toLocaleString()}
          icon="🎫"
          colorClass="bg-gradient-to-br from-blue-50 to-blue-100"
          textColorClass="text-blue-900"
        />
        <MetricCard
          title="Total Sold"
          value={totalSold.toLocaleString()}
          icon="📊"
          colorClass="bg-gradient-to-br from-green-50 to-green-100"
          textColorClass="text-green-900"
        />
        <MetricCard
          title="Paid Tickets"
          value={paidTickets.toLocaleString()}
          icon="💰"
          colorClass="bg-gradient-to-br from-emerald-50 to-emerald-100"
          textColorClass="text-emerald-900"
        />
        <MetricCard
          title="Complimentary"
          value={complementaryTickets.toLocaleString()}
          icon="🎁"
          colorClass="bg-gradient-to-br from-purple-50 to-purple-100"
          textColorClass="text-purple-900"
        />
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(totalAmount)}
          icon="💵"
          colorClass="bg-gradient-to-br from-yellow-50 to-yellow-100"
          textColorClass="text-yellow-900"
        />
      </div>

      {/* Category Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Ticket Categories
          </h2>
          <span className="text-sm text-gray-500">
            {ticketCategories.length} categories available
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {ticketCategories.map((category) => {
            const sold = category.sold_quantity;
            const total = category.total_quantity;
            const left = total - sold;
            const soldPercent =
              total > 0 ? Math.round((sold / total) * 100) : 0;

            return (
              <CategoryCard
                key={category.id}
                category={category}
                sold={sold}
                total={total}
                left={left}
                soldPercent={soldPercent}
                price={category.price}
              />
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {ticketCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No ticket categories found
          </h3>
          <p className="text-gray-600">
            Create ticket categories to start tracking sales.
          </p>
        </div>
      )}
    </div>
  );
};

export default SalesOverview;
