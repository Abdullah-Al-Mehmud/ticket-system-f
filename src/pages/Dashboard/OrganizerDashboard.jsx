import React, { useState } from 'react';
import { 
  Calendar, Users, DollarSign, Star, Plus, Search, Filter, MoreHorizontal, 
  Edit, Trash2, Eye, MapPin, Clock, Bell, Settings, BarChart3, 
  CheckCircle, XCircle, AlertTriangle, MessageCircle, Share2, Download
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const OrganizerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateEvent, setShowCreateEvent] = useState(false);

    // Get data form localStorage
    const  user = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : {};


  // Sample organizer data
  const organizerStats = [
    { title: 'My Events', value: '24', change: '+3 this month', icon: Calendar, color: 'bg-blue-500' },
    { title: 'Total Attendees', value: '3,247', change: '+234 this week', icon: Users, color: 'bg-green-500' },
    { title: 'Revenue', value: '$45,230', change: '+$5,200', icon: DollarSign, color: 'bg-purple-500' },
    { title: 'Avg Rating', value: '4.8', change: '+0.2 rating', icon: Star, color: 'bg-yellow-500' }
  ];

  const myEvents = [
    {
      id: 1,
      title: 'Web Development Workshop',
      date: '2024-08-15',
      time: '09:00 AM',
      location: 'Online',
      attendees: 45,
      capacity: 50,
      status: 'active',
      revenue: '$2,250',
      category: 'Workshop',
      registrations: 'open'
    },
    {
      id: 2,
      title: 'Digital Marketing Bootcamp',
      date: '2024-07-28',
      time: '10:00 AM',
      location: 'New York, NY',
      attendees: 120,
      capacity: 150,
      status: 'active',
      revenue: '$12,000',
      category: 'Training',
      registrations: 'open'
    },
    {
      id: 3,
      title: 'Startup Pitch Night',
      date: '2024-08-05',
      time: '07:00 PM',
      location: 'San Francisco, CA',
      attendees: 85,
      capacity: 100,
      status: 'active',
      revenue: '$4,250',
      category: 'Networking',
      registrations: 'open'
    },
    {
      id: 4,
      title: 'AI Conference 2024',
      date: '2024-07-15',
      time: '09:00 AM',
      location: 'Boston, MA',
      attendees: 200,
      capacity: 200,
      status: 'completed',
      revenue: '$15,000',
      category: 'Conference',
      registrations: 'closed'
    }
  ];

  const recentActivity = [
    { type: 'registration', message: 'New registration for Web Development Workshop', time: '5 min ago', icon: CheckCircle, color: 'text-green-500' },
    { type: 'message', message: 'New message from attendee', time: '15 min ago', icon: MessageCircle, color: 'text-blue-500' },
    { type: 'cancellation', message: 'Cancellation for Digital Marketing Bootcamp', time: '1 hour ago', icon: XCircle, color: 'text-red-500' },
    { type: 'reminder', message: 'Event reminder sent to 45 attendees', time: '2 hours ago', icon: Bell, color: 'text-purple-500' }
  ];

  const upcomingTasks = [
    { task: 'Send welcome email to new registrants', priority: 'high', due: 'Today' },
    { task: 'Prepare presentation materials', priority: 'medium', due: 'Tomorrow' },
    { task: 'Follow up with venue coordinator', priority: 'low', due: 'Aug 10' },
    { task: 'Update event description', priority: 'medium', due: 'Aug 12' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const StatCard = ({ stat }) => {
    const IconComponent = stat.icon;
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-sm text-green-600 mt-1">{stat.change}</p>
          </div>
          <div className={`${stat.color} p-3 rounded-full`}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    );
  };

  const EventCard = ({ event }) => (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {event.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {event.time}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {event.location}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
            <span className="text-sm text-gray-600">{event.attendees}/{event.capacity} attendees</span>
            <span className="text-sm font-medium text-green-600">{event.revenue}</span>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{Math.round((event.attendees / event.capacity) * 100)}% capacity</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <BarChart3 className="h-4 w-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Share2 className="h-4 w-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Edit className="h-4 w-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );

  const CreateEventModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Event</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Workshop</option>
              <option>Conference</option>
              <option>Networking</option>
              <option>Training</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button 
            onClick={() => setShowCreateEvent(false)}
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={() => setShowCreateEvent(false)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            </div>
            <div className="flex items-center gap-4">
              {/* <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </button> */}
              <div><p>{user.email}</p></div>
              <button 
                onClick={() => setShowCreateEvent(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Event
              </button>
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
           
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['dashboard', 'events', 'attendees', 'analytics', 'messages'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {organizerStats.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => {
                      const IconComponent = activity.icon;
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <IconComponent className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tasks</h2>
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="space-y-4">
                    {upcomingTasks.map((task, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{task.task}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <span className="text-xs text-gray-500">{task.due}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Send Reminder</span>
                </button>
                <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Export Data</span>
                </button>
                <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search my events..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">All Events</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Events List */}
            <div className="space-y-4">
              {myEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'attendees' && (
          <div className="space-y-6">
            <Alert>
              <Users className="h-4 w-4" />
              <AlertDescription>
                Manage attendees across all your events. View registration details, send messages, and track attendance.
              </AlertDescription>
            </Alert>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendee Management</h3>
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Attendee management interface would be implemented here</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Performance</h3>
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <p className="text-gray-500">Performance chart would go here</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics</h3>
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <p className="text-gray-500">Revenue chart would go here</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Messages & Communications</h3>
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Messaging interface would be implemented here</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Event Modal */}
      {showCreateEvent && <CreateEventModal />}
    </div>
  );
};

export default OrganizerDashboard;