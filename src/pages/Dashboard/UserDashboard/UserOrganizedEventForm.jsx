import React from "react";
import { CalendarDays, MapPinCheck, Users } from "lucide-react";
import TableRowSkeleton from "../../../components/LoderComponent/TableRowSkeleton";
import { Link } from "react-router-dom";
import { useGetOrganizerEventsQuery } from "../../../redux/features/event/EventApiSlice";

function UserOrganizedEventForm() {
  const { data, isLoading, isError } = useGetOrganizerEventsQuery();

  return (
    <>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 pt-5 gap-6 mb-6">
        <div className="bg-amber rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 rounded-lg">
              <CalendarDays className="w-6 h-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-amber-600">Total Events</p>
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
              <p className="text-sm font-medium text-amber-600">Live Events</p>
              <p className="text-2xl font-bold text-amber-900">
                {data?.data?.filter((event) => event.status === "Live")
                  ?.length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-amber rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Users className="w-6 h-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-amber-600">Organizers</p>
              <p className="text-2xl font-bold text-amber-900">
                {new Set(
                  data?.data?.flatMap((event) =>
                    event.organizers?.map((org) => org.email)
                  )
                ).size || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-amber rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-amber-200">
          <h2 className="text-lg font-medium text-amber-900">
            My Organized Events
          </h2>
        </div>
        <div className="overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto">
            <table className="w-full min-w-[1000px] divide-y divide-amber-200">
              <thead className="bg-amber border-b border-amber">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black-200 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Start Date</th>
                  <th className="px-6 py-3">End Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-amber divide-y divide-amber-200">
                {isLoading && (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-amber-500">
                      <TableRowSkeleton count={2} />
                    </td>
                  </tr>
                )}

                {isError && (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-red-500">
                      Failed to load events.
                    </td>
                  </tr>
                )}

                {!isLoading && !isError && data?.data?.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-amber-500">
                      No events found.
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  !isError &&
                  data?.data?.map((event) => (
                    <tr key={event.id} className="hover:bg-amber-100">
                      <td className="px-6 py-4 text-sm font-semibold text-amber-900">
                        {event.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-800">
                        {event.category?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-800">
                        {event.location}
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-800">
                        {new Date(event.start_date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-800">
                        {new Date(event.end_date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-800">
                        {event.status}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/event-details/${event.id}`}
                            className="text-amber-600 hover:text-amber-800 p-1"
                            title="View Event"
                          >
                            <span className="underline">View</span>
                          </Link>
                          {/* Add edit/delete if needed */}
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

export default UserOrganizedEventForm;
