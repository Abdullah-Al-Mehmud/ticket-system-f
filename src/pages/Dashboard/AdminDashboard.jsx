import React, { use, useEffect, useState } from 'react';
import { Calendar, Users, DollarSign, TrendingUp, Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, MapPin, Clock, LogOut } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Get data form localStorage
  const  user = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : {};
   
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear("token");
    navigate("/login");
  }

  // Sample data
  const stats = [
    { title: 'Total Events', value: '247', change: '+12%', icon: Calendar, color: 'bg-blue-500' },
    { title: 'Total Attendees', value: '12,483', change: '+8%', icon: Users, color: 'bg-green-500' },
    { title: 'Revenue', value: '$125,430', change: '+23%', icon: DollarSign, color: 'bg-purple-500' },
    { title: 'Growth Rate', value: '18.2%', change: '+2.1%', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  const events = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      date: '2024-08-15',
      time: '09:00 AM',
      location: 'San Francisco, CA',
      attendees: 450,
      status: 'active',
      revenue: '$15,230',
      category: 'Conference'
    },
    {
      id: 2,
      title: 'Music Festival Summer',
      date: '2024-07-20',
      time: '06:00 PM',
      location: 'Los Angeles, CA',
      attendees: 2500,
      status: 'sold-out',
      revenue: '$89,450',
      category: 'Festival'
    },
    {
      id: 3,
      title: 'Business Networking',
      date: '2024-08-05',
      time: '07:00 PM',
      location: 'New York, NY',
      attendees: 120,
      status: 'active',
      revenue: '$4,800',
      category: 'Networking'
    },
    {
      id: 4,
      title: 'Art Exhibition',
      date: '2024-07-30',
      time: '10:00 AM',
      location: 'Chicago, IL',
      attendees: 200,
      status: 'completed',
      revenue: '$6,750',
      category: 'Exhibition'
    },
    {
      id: 5,
      title: 'Food & Wine Tasting',
      date: '2024-08-10',
      time: '05:00 PM',
      location: 'Miami, FL',
      attendees: 85,
      status: 'active',
      revenue: '$3,200',
      category: 'Food'
    }
  ];

  const recentActivities = [
    { action: 'New registration', event: 'Tech Conference 2024', time: '2 min ago' },
    { action: 'Event created', event: 'Workshop: Digital Marketing', time: '1 hour ago' },
    { action: 'Payment received', event: 'Music Festival Summer', time: '3 hours ago' },
    { action: 'Event updated', event: 'Business Networking', time: '5 hours ago' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'sold-out': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || event.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const StatCard = ({ stat }) => {
    const IconComponent = stat.icon;
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
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
            <span className="text-sm text-gray-600">{event.attendees} attendees</span>
            <span className="text-sm font-medium text-green-600">{event.revenue}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Eye className="h-4 w-4 text-gray-600" />
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            </div>
            <Link to="/">

                          <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-gray-900">
                              Tap<span className="text-blue-600">Kori</span>
                            </h1>
                          </div>
                          </Link>
            <div className="flex items-center gap-4">
            <p>{user.email}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Event
              </button>
              <button 
  onClick={handleLogout}
  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
>
  <LogOut className="h-4 w-4" />
  Logout
</button>
              
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['overview', 'events', 'analytics', 'settings'].map((tab) => (
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
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </div>

            {/* Recent Events and Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Events */}
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Events</h2>
                <div className="space-y-4">
                  {events.slice(0, 3).map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>

              {/* Recent Activities */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.event}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
                    placeholder="Search events..."
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
                  <option value="sold-out">Sold Out</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>
            </div>

            {/* Events List */}
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No events found matching your criteria.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <Alert>
              <TrendingUp className="h-4 w-4" />
              <AlertDescription>
                Analytics dashboard showing event performance metrics and insights.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart visualization would go here</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Analytics</h3>
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart visualization would go here</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive notifications for new registrations</p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Enable
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Auto-backup</p>
                    <p className="text-sm text-gray-600">Automatically backup event data</p>
                  </div>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                    Disabled
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
