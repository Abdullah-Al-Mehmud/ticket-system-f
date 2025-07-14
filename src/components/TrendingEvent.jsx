import React from "react";
import { Calendar, MapPin, Users, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetEventsQuery } from "../redux/features/event/EventApiSlice";

const TrendingEvent = () => {
  const { data, isLoading, isError } = useGetEventsQuery();
  const events = data?.data ?? []; // safely get the array

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              Trending Events
            </h3>
            <p className="text-xl text-gray-600">
              Don't miss out on these popular events
            </p>
          </div>
          <Link
            to="/event"
            className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium">
            View All Events
            <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        </div>

        {isLoading && (
          <div className="text-center text-gray-500">Loading events...</div>
        )}

        {isError && (
          <div className="text-center text-red-500">Failed to load events.</div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="relative">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
                    <span>
                      {new Date(event.start_date).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(event.start_date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{event.organizer.name}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-600">
                   ৳ {event.ticket_price}
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
  );
};

export default TrendingEvent;
