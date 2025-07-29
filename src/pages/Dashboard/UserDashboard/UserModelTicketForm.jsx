import React from "react";
import { useGetUserTicketsQuery } from "../../../redux/features/tickets/ticketsApiSlice";
import { Bell, ChartBarStacked, Download, Eye, MapPinCheck, Table } from "lucide-react";
import { Link } from 'react-router-dom';
import TableRowSkeleton from "../../../components/LoderComponent/TableRowSkeleton";

function UserModelTicketForm() {
  const { data, isLoading, isError } = useGetUserTicketsQuery();
  return (
    <>
      {/* Profile Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-amber rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 rounded-lg">
              <ChartBarStacked className="w-6 h-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-amber-600">
                Total Bookings
              </p>
              <p className="text-2xl font-bold text-amber-900">
                {data?.data?.length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-amber rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 rounded-lg">
              <MapPinCheck className="w-6 h-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-amber-600">
                Active Tickets
              </p>
              <p className="text-2xl font-bold text-amber-900">
                {data?.data?.filter((booking) => booking.status === "active")
                  ?.length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-amber rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Bell className="w-6 h-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-amber-600">Total Spent</p>
              <p className="text-2xl font-bold text-amber-900">
                {data?.data
                  ?.reduce(
                    (total, booking) =>
                      total +
                      (booking?.quantity * booking?.ticket_category?.price ||
                        0),
                    0
                  )
                  .toFixed(2)}{" "}
                ৳
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* {UserModelForm} */}
      <div className="bg-amber rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-amber-200">
          <h2 className="text-lg font-medium text-amber-900">My Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto">
            <table className="w-full min-w-[1000px] divide-y divide-amber-200">
              <thead className="bg-amber border-b border-amber">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black-200 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3">Ticket Per Price</th>
                  <th className="px-6 py-3">Ticket Quantity</th>
                  <th className="px-6 py-3">Total Cost</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-amber divide-y divide-amber-200">
                {/* Loading */}
                {isLoading && (
                  <tr>
                    <td colSpan="9" className="text-center py-6 text-amber-500">
                      <TableRowSkeleton count={2} />
                    </td>
                  </tr>
                )}

                {/* Error */}
                {isError && (
                  <tr>
                    <td colSpan="9" className="text-center py-6 text-red-500">
                      Failed to load data.
                    </td>
                  </tr>
                )}

                {/* Empty */}
                {!isLoading && !isError && data?.data?.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center py-6 text-amber-500">
                      No bookings found.
                    </td>
                  </tr>
                )}

                {/* Data Rows */}
                {!isLoading &&
                  !isError &&
                  data?.data?.map((booking) => (
                    <tr key={booking.id} className="hover:bg-amber">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-amber-900">
                          {booking?.ticket_category?.event?.title ||
                            "Untitled Event"}
                        </div>

                        <div className="text-sm text-amber-600 font-medium">
                          Booking ID: {booking.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-900">
                        {booking?.ticket_category?.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-900">
                        x {booking.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-900">
                        {(
                          booking?.quantity * booking?.ticket_category?.price
                        ).toFixed(2)}
                        taka
                      </td>

                      <td className="px-6 py-4 text-sm text-amber-900">
                        {booking.status}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/user/user-view-ticket/${booking.id}`}
                            className="text-amber-600 hover:text-amber-800 p-1"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            className="text-amber-600 hover:text-amber-800 p-1"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserModelTicketForm;
