import React, { useState } from 'react';
import {
  Eye, Edit, Trash2, Plus, Search, Filter, Download, MoreVertical, Calendar, MapPin, Users, Clock
} from 'lucide-react';
import { useGetEventsQuery } from '../../redux/features/event/EventApiSlice';
import { Link } from 'react-router-dom';

const AllEventslist = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('event_name');
  const [sortOrder, setSortOrder] = useState('asc');

  const { data, isLoading, isError } = useGetEventsQuery();
  const events = data?.data || [];

  const filteredEvents = events
    .filter((event) => {
      const titleMatch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = categoryFilter === 'all' || event.category.name === categoryFilter;
      const statusMatch = statusFilter === 'all' || event.status === statusFilter;
      return titleMatch && categoryMatch && statusMatch;
    })
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getCategoryBadge = (category) => {
    const categoryColors = {
      Technology: 'bg-purple-100 text-purple-800',
      Marketing: 'bg-pink-100 text-pink-800',
      Finance: 'bg-indigo-100 text-indigo-800',
      'Human Resources': 'bg-orange-100 text-orange-800',
      Operations: 'bg-teal-100 text-teal-800',
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded ${categoryColors[category] || 'bg-gray-100 text-gray-800'}`}>
        {category}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">All Events</h1>
            <p className="mt-2 text-gray-600">Manage and track all your events in one place</p>
          </div>
          <Link to="/admin/create-event" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus size={20} /> Create Event
          </Link>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="upcoming">Upcoming</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="Sports">Sports</option>
                  <option value="Music">Music</option>
                  <option value="Business">Business</option>
                  <option value="Education">Education</option>
                  <option value="Tech">Tech</option>
                </select>

                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Filter size={16} /> Filter
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Download size={16} /> Export
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Event Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Organizer</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">#{event.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{event.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{getCategoryBadge(event.category.name)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{event.organizer.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{getStatusBadge(event.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div>{formatDate(event.start_date)}</div>
                      <div className="text-xs text-gray-400">{event.end_date}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{event.location}</td>
                    <td className="px-6 py-4 text-sm text-green-600">{event.ticket_price}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded" title="View"><Eye size={16} /></button>
                        <button className="text-green-600 hover:text-green-800 hover:bg-green-50 p-1 rounded" title="Edit"><Edit size={16} /></button>
                        <button className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded" title="Delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEventslist;
