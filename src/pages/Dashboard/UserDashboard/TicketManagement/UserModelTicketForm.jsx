import React from "react";
import { useGetUserTicketsQuery } from "../../../../redux/features/tickets/ticketsApiSlice";
import { Bell, ChartBarStacked, MapPinCheck } from "lucide-react";
import { Link } from "react-router-dom";
import TableRowSkeleton from "../../../../components/LoaderComponent/TableRowSkeleton";

function UserModelTicketForm() {
  const { data, isLoading, isError } = useGetUserTicketsQuery();
  return (
    <>
      {/* Profile Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 rounded-lg">
              <ChartBarStacked className="w-6 h-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-800">
                Total Bookings
              </p>
              <p className="text-2xl font-bold text-amber-900">
                {data?.data?.length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 rounded-lg">
              <MapPinCheck className="w-6 h-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-800">
                Active Tickets
              </p>
              <p className="text-2xl font-bold text-amber-900">
                {data?.data?.filter((booking) => booking.status === "active")
                  ?.length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Bell className="w-6 h-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-800">Total Spent</p>
              <p className="text-2xl font-bold text-amber-900">
                {data?.data
                  ?.reduce(
                    (total, booking) =>
                      total +
                      (booking?.quantity * booking?.ticket_category?.price ||
                        0),
                    0
                  )
                  .toFixed(0)}{" "}
                <span className="font-mono mr-1">৳</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MY BOOKINGS */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-amber-200">
          <h2 className="text-lg font-medium text-amber-900">My Bookings</h2>
        </div>

        <div className="p-6">
          {/* Loading */}
          {isLoading && (
            <div className="text-center py-6 text-amber-500">
              <TableRowSkeleton count={2} />
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="text-center py-6 text-red-500">
              Failed to load data.
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && data?.data?.length === 0 && (
            <div className="text-center py-6 text-amber-500">
              No bookings found.
            </div>
          )}

          {/* Mini Real Tickets */}
          {!isLoading && !isError && data?.data?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ">
              {data.data.map((booking) => (
                <Link
                  key={booking.id}
                  to={`/user/user-view-ticket/${booking.id}`}
                >
                  <div
                    className="relative bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border-2 border-dashed border-amber-400 cursor-pointer "
                    style={{
                      width: "350px",
                      height: "220px",
                      backgroundImage: `repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 10px,
                      rgba(245, 158, 11, 0.1) 10px,
                      rgba(245, 158, 11, 0.1) 11px
                    )`,
                    }}
                  >
                    {/* Ticket Stub - Left Side */}
                    <div className="flex h-full">
                      <div className="w-4 bg-amber-200 rounded-l-lg flex flex-col justify-center items-center py-4">
                        <div className="text-xs font-bold text-amber-800 transform -rotate-90 whitespace-nowrap">
                          TICKET
                        </div>
                      </div>

                      {/* Main Ticket Content */}
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        {/* Header */}
                        <div className="border-b border-amber-300 border-dashed pb-3 mb-3">
                          
                          <div className="flex items-start justify-between ">
                            <h3 className="text-sm font-bold text-amber-900 mb-2 line-clamp-3 leading-tight">
                            {booking?.ticket_category?.event?.title ||
                              "Untitled Event"}
                          </h3>
                             <span
                              className={`text-[10px] px-2 py-[2px] rounded-full font-semibold ${
                                booking.status === "Confirmed"
                                  ? "bg-green-200 text-green-800"
                                  : "bg-gray-200 text-gray-800"
                              }`}
                            >
                              {booking.status.toUpperCase()}
                            </span>
                          </div>
                          

                          <div className="flex justify-between items-center">
                            <span className="text-xs text-amber-700 font-mono">
                              {booking.ticket_category.name}
                            </span>
                           
                          </div>
                        </div>

                        {/* Middle Content */}
                        <div className="flex-1 flex flex-col justify-center">
                          {/* Ticket Details Grid */}
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="text-center">
                              <div className="text-xs text-amber-600 font-semibold uppercase tracking-wide">
                                Price
                              </div>
                              <div className="text-base font-bold text-amber-900">
                                {Number(
                                  booking?.ticket_category?.price
                                ).toFixed(0)}{" "}
                                <span className="font-mono mr-1">৳</span>
                              </div>
                            </div>

                            <div className="text-center">
                              <div className="text-xs text-amber-600 font-semibold uppercase tracking-wide">
                                Qty
                              </div>
                              <div className="text-base font-bold text-amber-900">
                                {booking.quantity}
                              </div>
                            </div>
                          </div>

                          {/* Total Amount - Prominent */}
                          <div className="bg-amber-200 rounded-md p-2 mb-3 text-center border border-amber-300">
                            <div className="text-xs text-amber-700 font-semibold uppercase">
                              Total Amount
                            </div>
                            <div className="text-lg font-bold text-amber-900">
                              {(
                                booking?.quantity *
                                booking?.ticket_category?.price
                              ).toFixed(0)}{" "}
                              <span className="font-mono mr-[2px]">৳</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Perforated Edge Effect */}
                    <div className="absolute left-4 top-0 bottom-0 w-px">
                      <div
                        className="h-full w-full bg-amber-300 opacity-50"
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                             0deg,
                             transparent,
                             transparent 4px,
                             rgba(245, 158, 11, 0.8) 4px,
                             rgba(245, 158, 11, 0.8) 6px
                           )`,
                        }}
                      ></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserModelTicketForm;
