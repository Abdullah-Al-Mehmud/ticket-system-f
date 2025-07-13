import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  Ticket,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Calendar,
  User,
  Settings,
  LogOut,
  Bell,
  HelpCircle,
  FileText,
  Star,
  ChevronRight,
} from "lucide-react";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "JD",
    memberSince: "March 2023",
  };

  // Mock stats for the user
  const userStats = [
    {
      title: "Total Tickets",
      value: "24",
      icon: Ticket,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Open Tickets",
      value: "3",
      icon: AlertCircle,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Resolved",
      value: "18",
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Avg Response",
      value: "4.2h",
      icon: Clock,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  // Mock user tickets
  const userTickets = [
    {
      id: "TK-001",
      title: "Unable to reset password",
      description:
        "I am having trouble resetting my password. The reset link is not working.",
      priority: "High",
      status: "Open",
      category: "Account",
      created: "2 hours ago",
      lastUpdate: "1 hour ago",
      responses: 2,
    },
    {
      id: "TK-002",
      title: "Billing inquiry about subscription",
      description: "I need clarification on my monthly subscription charges.",
      priority: "Medium",
      status: "In Progress",
      category: "Billing",
      created: "1 day ago",
      lastUpdate: "4 hours ago",
      responses: 1,
    },
    {
      id: "TK-003",
      title: "Feature request: Export functionality",
      description: "It would be great to have an export feature for my data.",
      priority: "Low",
      status: "Open",
      category: "Feature Request",
      created: "3 days ago",
      lastUpdate: "2 days ago",
      responses: 0,
    },
    {
      id: "TK-004",
      title: "Login issues resolved",
      description: "Was having trouble logging in from mobile device.",
      priority: "High",
      status: "Resolved",
      category: "Technical",
      created: "5 days ago",
      lastUpdate: "3 days ago",
      responses: 3,
    },
    {
      id: "TK-005",
      title: "App crashes on startup",
      description: "The mobile app crashes immediately after opening.",
      priority: "Critical",
      status: "Resolved",
      category: "Technical",
      created: "1 week ago",
      lastUpdate: "5 days ago",
      responses: 5,
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "In Progress":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredTickets = userTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === "all") return matchesSearch;
    return (
      matchesSearch &&
      ticket.status.toLowerCase().replace(" ", "") === selectedFilter
    );
  });

  const filters = [
    { id: "all", label: "All Tickets", count: userTickets.length },
    {
      id: "open",
      label: "Open",
      count: userTickets.filter((t) => t.status === "Open").length,
    },
    {
      id: "inprogress",
      label: "In Progress",
      count: userTickets.filter((t) => t.status === "In Progress").length,
    },
    {
      id: "resolved",
      label: "Resolved",
      count: userTickets.filter((t) => t.status === "Resolved").length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Welcome back, {user.name}
                  </h1>
                  <p className="text-sm text-gray-600">
                    Manage your support tickets
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Ticket
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, index) => (
            <Card
              key={index}
              className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bg}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Plus className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Create New Ticket
                  </h3>
                  <p className="text-sm text-gray-600">
                    Submit a new support request
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Knowledge Base</h3>
                  <p className="text-sm text-gray-600">
                    Find answers to common questions
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Feedback</h3>
                  <p className="text-sm text-gray-600">
                    Rate our support service
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tickets Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                My Tickets
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search your tickets..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1 mt-4">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.id)}
                  className="text-sm">
                  {filter.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">
                            {ticket.title}
                          </h3>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {ticket.description}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Ticket className="w-4 h-4" />
                            <span>{ticket.id}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Created {ticket.created}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Updated {ticket.lastUpdate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{ticket.responses} responses</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        {ticket.status !== "Resolved" && (
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Reply
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTickets.length === 0 && (
              <div className="text-center py-12">
                <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No tickets found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm
                    ? "No tickets match your search criteria."
                    : "You haven't created any tickets yet."}
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Ticket
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
