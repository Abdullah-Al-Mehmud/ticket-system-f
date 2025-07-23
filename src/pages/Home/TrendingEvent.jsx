import React from "react";
import { Calendar, MapPin, Clock, ChevronRight, Star, Loader2, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetEventsQuery } from "../../redux/features/event/EventApiSlice";
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { Alert, AlertDescription } from '../../components/ui/alert';

const TrendingEvent = () => {
  const { data, isLoading, isError } = useGetEventsQuery();
  const events = data?.data ?? [];

  // Filter for upcoming events only
  const upcomingEvents = events.filter(event => {
    if (!event.start_date) return false;
    const eventDate = new Date(event.start_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    return eventDate >= today;
  }).sort((a, b) => new Date(a.start_date) - new Date(b.start_date)); // Sort by date, earliest first

  const LoadingSkeleton = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-9 w-24" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200">
            <CalendarDays className="w-4 h-4 mr-2" />
            Coming Soon
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Upcoming Events
          </h2>
          <p className="text-lg text-slate-600">
            Discover exciting events happening near you
          </p>
        </div>

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* Error State */}
        {isError && (
          <Alert className="max-w-md mx-auto border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">
              Failed to load events. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Events Grid */}
        {!isLoading && !isError && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.slice(0, 6).map((event) => (
                <Link
                  to={`/eventdetails/${event.id}`}
                  key={event.id}
                  className="group block"
                >
                  <Card className="overflow-hidden border-0 shadow-sm  transition-all duration-300  bg-white p-0">
                    <div className="relative">
                      {event.image_url ? (
                        <>
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentNode.querySelector('.fallback-img').style.display = 'flex';
                            }}
                          />
                          <div className="fallback-img hidden absolute inset-0 bg-gray-200 items-end justify-center pb-4 shadow-md">
                            <span className="text-xl font-bold text-slate-900 ">TapKori</span>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 bg-gray-200 flex items-center justify-center">
                          <span className="text-6xl font-bold text-slate-400">TapKori</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Badge 
                        variant="secondary" 
                        className="absolute top-3 left-3 bg-white/95 text-slate-700 hover:bg-white border-0 shadow-sm"
                      >
                        {event.category?.name || 'Event'}
                      </Badge>
                      {/* Days until event badge */}
                      <Badge 
                        className="absolute top-3 right-3 bg-amber-600 text-white border-0 shadow-sm"
                      >
                        {(() => {
                          const eventDate = new Date(event.start_date);
                          const today = new Date();
                          const diffTime = eventDate - today;
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                          return diffDays === 0 ? 'Today' : diffDays === 1 ? 'Tomorrow' : `${diffDays} days`;
                        })()}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-5">
                      <h3 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors">
                        {event.title}
                      </h3>

                      <div className="space-y-2 mb-4">
                        {event.start_date && (
                          <div className="flex items-center text-sm text-slate-600">
                            <Calendar className="w-4 h-4 mr-3 text-amber-600" />
                            <span>
                              {new Date(event.start_date).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            <Clock className="w-4 h-4 ml-4 mr-2 text-amber-600" />
                            <span>
                              {new Date(event.start_date).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex items-center text-sm text-slate-600">
                          <MapPin className="w-4 h-4 mr-3 text-amber-600 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && !isError && upcomingEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
              <CalendarDays className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No upcoming events</h3>
            <p className="text-slate-600">Check back later for new events being added.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingEvent;