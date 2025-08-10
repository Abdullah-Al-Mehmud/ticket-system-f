import React from "react";
import {  CalendarDays } from "lucide-react";
import { Alert, AlertDescription } from "../../../../ui/alert";
import EventCard from "../EventPage/EventCard";
import { useGetEventsQuery } from "../../../../../store/features/event/EventApiSlice";
import { Badge } from "../../../../ui/badge";
import EventCardLoadingSkeleton from "../../../../common/loaderComponent/EventCardLoadingSkeleton";

const TrendingEvent = () => {
  const { data, isLoading, isError } = useGetEventsQuery({
    page: 1,
    count: 6,
  });
  const events = data?.data ?? [];

  const upcomingEvents = events
    .filter((event) => {
      if (!event.start_date) return false;
      const eventDate = new Date(event.start_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return (
        eventDate >= today &&
        (event.status === "Upcoming" || event.status === "Live")
      );
    })
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200"
          >
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

        {isLoading && <EventCardLoadingSkeleton count={6} />}

        {isError && (
          <Alert className="max-w-md mx-auto border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">
              Failed to load events. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !isError && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {!isLoading && !isError && upcomingEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
              <CalendarDays className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No upcoming events
            </h3>
            <p className="text-slate-600">
              Check back later for new events being added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingEvent;
