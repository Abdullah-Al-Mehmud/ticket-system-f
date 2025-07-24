import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

import { useGetTicketCategoriesQuery } from "../../redux/features/ticketcategories/ticketCategoriesApiSlice";

export default function TicketCategories() {
  const { data: fetchData, isLoading, isError } = useGetTicketCategoriesQuery();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              All Ticket Categories
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  category Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Event Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  sales_start
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  sales_end
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  total_quantity
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  sold_quantity
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fetchData?.data.map((event, index) => (
                <tr
                  key={event?.id}
                  className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{event?.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {event?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {event?.event?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {event?.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {event?.sales_start}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {event?.sales_end}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {event?.total_quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {event?.sold_quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewEvent(event.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View">
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEditEvent(event.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete">
                        <Trash2 size={16} />
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
  );
}
