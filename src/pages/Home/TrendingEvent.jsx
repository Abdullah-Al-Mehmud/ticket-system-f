import React from "react";
import { Calendar, MapPin, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetEventsQuery } from "../../redux/features/event/EventApiSlice";

const TrendingEvent = () => {
  const { data, isLoading, isError } = useGetEventsQuery();
  const events = data?.data ?? [];


  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Trending Events</h3>
            <p className="text-xl text-gray-600">Don't miss out on these popular events</p>
          </div>
          <Link
            to="/event"
            className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Events
            <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        </div>

        {/* Loading & Error */}
        {isLoading && (
          <div className="text-center text-gray-500">Loading events...</div>
        )}
        {isError && (
          <div className="text-center text-red-500">Failed to load events.</div>
        )}

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {events.slice(0, 4).map((event) => (
            <Link
              to={`/eventdetails/${event.id}`}
              key={event.id}
              className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="relative">
                <img
                  src={event.image_url || "https://via.placeholder.com/400x200?text=No+Image"}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
                  {event.category.name}
                </div>
              </div>
              <div className="p-2">
                <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {event.title}
                </h4>

                <div className="grid grid-cols-2 space-y-2 text-sm text-gray-600 mb-2">
                  {event.start_date && (
                    <>
                      <div className="col-span-1 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          {new Date(event.start_date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>
                          {new Date(event.start_date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="col-span-1 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
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
            </Link>
          ))}
        </div>

        {/* Mobile view all button */}
        <div className="text-center mt-8">
          <Link to="/event">
            <button className="md:hidden bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              View All Events
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingEvent;
