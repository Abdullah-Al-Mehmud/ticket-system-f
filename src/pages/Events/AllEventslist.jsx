import React, { useState } from 'react';
import { Eye, Edit, Trash2, Plus, Search, Filter, Download, MoreVertical, Calendar, MapPin, Users, Clock } from 'lucide-react';

const AllEventslist = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('event_name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Sample events data
  const [events, setEvents] = useState([
    {
      id: 1,
      event_name: 'Annual Tech Conference 2024',
      category: 'Technology',
      status: 'active',
      event_date: '2024-08-15',
      event_time: '09:00 AM',
      location: 'Convention Center, NYC',
      attendees: 450,
      max_capacity: 500,
      price: '$299',
      created_at: '2024-01-15',
      updated_at: '2024-03-20'
    },
    {
      id: 2,
      event_name: 'Marketing Summit 2024',
      category: 'Marketing',
      status: 'active',
      event_date: '2024-07-22',
      event_time: '10:00 AM',
      location: 'Marriott Hotel, Chicago',
      attendees: 180,
      max_capacity: 200,
      price: '$199',
      created_at: '2024-02-10',
      updated_at: '2024-03-18'
    },
    {
      id: 3,
      event_name: 'Finance Workshop',
      category: 'Finance',
      status: 'completed',
      event_date: '2024-06-10',
      event_time: '02:00 PM',
      location: 'Business Center, LA',
      attendees: 85,
      max_capacity: 100,
      price: '$149',
      created_at: '2024-01-20',
      updated_at: '2024-06-11'
    },
    {
      id: 4,
      event_name: 'HR Leadership Forum',
      category: 'Human Resources',
      status: 'pending',
      event_date: '2024-09-05',
      event_time: '11:00 AM',
      location: 'Corporate Plaza, Miami',
      attendees: 120,
      max_capacity: 150,
      price: '$179',
      created_at: '2024-03-01',
      updated_at: '2024-03-22'
    },
    {
      id: 5,
      event_name: 'Operations Excellence Workshop',
      category: 'Operations',
      status: 'cancelled',
      event_date: '2024-07-30',
      event_time: '01:00 PM',
      location: 'Training Center, Boston',
      attendees: 45,
      max_capacity: 80,
      price: '$129',
      created_at: '2024-03-05',
      updated_at: '2024-07-15'
    },
    {
      id: 6,
      event_name: 'Digital Innovation Expo',
      category: 'Technology',
      status: 'active',
      event_date: '2024-10-12',
      event_time: '09:30 AM',
      location: 'Tech Hub, San Francisco',
      attendees: 320,
      max_capacity: 400,
      price: '$249',
      created_at: '2024-02-28',
      updated_at: '2024-03-25'
    }
  ]);

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getCategoryBadge = (category) => {
    const categoryColors = {
      'Technology': 'bg-purple-100 text-purple-800',
      'Marketing': 'bg-pink-100 text-pink-800',
      'Finance': 'bg-indigo-100 text-indigo-800',
      'Human Resources': 'bg-orange-100 text-orange-800',
      'Operations': 'bg-teal-100 text-teal-800'
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
      day: 'numeric'
    });
  };

  const getAttendancePercentage = (attendees, maxCapacity) => {
    return Math.round((attendees / maxCapacity) * 100);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedEvents = events
    .filter(event => {
      const matchesSearch = event.event_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">All Events</h1>
              <p className="mt-2 text-gray-600">Manage and track all your events in one place</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus size={20} />
              Create Event
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Calendar className="text-blue-600" size={24} />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-2xl font-semibold text-gray-900">{events.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Clock className="text-green-600" size={24} />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Events</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {events.filter(e => e.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Users className="text-purple-600" size={24} />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Attendees</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {events.reduce((sum, event) => sum + event.attendees, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <MapPin className="text-orange-600" size={24} />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed Events</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {events.filter(e => e.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
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
                  <option value="cancelled">Cancelled</option>
                </select>
                
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="Technology">Technology</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Operations">Operations</option>
                </select>
                
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Filter size={16} />
                  Filter
                </button>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Download size={16} />
                Export
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
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('id')}
                  >
                    ID
                    {sortBy === 'id' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('event_name')}
                  >
                    Event Name
                    {sortBy === 'event_name' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('category')}
                  >
                    Category
                    {sortBy === 'category' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('status')}
                  >
                    Status
                    {sortBy === 'status' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('event_date')}
                  >
                    Date & Time
                    {sortBy === 'event_date' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('attendees')}
                  >
                    Attendance
                    {sortBy === 'attendees' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('price')}
                  >
                    Price
                    {sortBy === 'price' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{event.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      <div className="max-w-xs truncate">{event.event_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getCategoryBadge(event.category)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getStatusBadge(event.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{formatDate(event.event_date)}</div>
                      <div className="text-xs text-gray-400">{event.event_time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="max-w-xs truncate" title={event.location}>
                        {event.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>{event.attendees}/{event.max_capacity}</span>
                            <span>{getAttendancePercentage(event.attendees, event.max_capacity)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${getAttendancePercentage(event.attendees, event.max_capacity)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="font-medium text-green-600">{event.price}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded transition-colors"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-800 hover:bg-green-50 p-1 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAndSortedEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No events found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between bg-white px-6 py-3 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-600">
            Showing {filteredAndSortedEvents.length} of {events.length} events
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <span className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded">1</span>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEventslist;