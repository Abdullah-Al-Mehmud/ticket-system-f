import React from "react";
import {
  Calendar,
  MapPin,
  Users,
  Star,
  ChevronRight,
  Menu,
  X,
  Clock,
  Shield,
  Award,
  Zap,
  Search,
} from "lucide-react";
const events = [
  {
    id: 1,
    title: "Summer Music Festival 2025",
    date: "Aug 15, 2025",
    time: "6:00 PM",
    location: "Central Park Arena",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop",
    category: "Music",
    attendees: 1200,
  },
  {
    id: 2,
    title: "Tech Innovation Conference",
    date: "Sep 22, 2025",
    time: "9:00 AM",
    location: "Convention Center",
    price: "$120",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
    category: "Technology",
    attendees: 800,
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    date: "Oct 8, 2025",
    time: "12:00 PM",
    location: "Downtown Plaza",
    price: "$35",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop",
    category: "Food",
    attendees: 600,
  },
  {
    id: 4,
    title: "Art Gallery Opening",
    date: "Nov 12, 2025",
    time: "7:00 PM",
    location: "Modern Art Museum",
    price: "$25",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    category: "Art",
    attendees: 300,
  },
];

const TrendingEvent = () => {
  return (
    <div>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Trending Events
              </h3>
              <p className="text-xl text-gray-600">
                Don't miss out on these popular events
              </p>
            </div>
            <button className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium">
              View All Events
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {event.price}
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="md:hidden bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              View All Events
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrendingEvent;
