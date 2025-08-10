import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";

const EventCard = ({ event }) => {
  return (
    <Link to={`/event-details/${event.id}`} className="group block">
      <Card className="overflow-hidden border-0 shadow-sm rounded-md transition-all duration-300 bg-white p-0 gap-3">
        <div className="relative">
          {event.image_url ? (
            <>
              <img
                src={`${import.meta.env.VITE_IMG_URL}/${event.image_url}`}
                alt={event.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentNode.querySelector(
                    ".fallback-img"
                  ).style.display = "flex";
                }}
              />
              <div className="fallback-img hidden absolute inset-0 bg-gray-200 items-end justify-center pb-4 shadow-md">
                <span className="text-xl font-bold text-slate-900">
                  TapKori
                </span>
              </div>
            </>
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-6xl font-bold text-slate-400">TapKori</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <Badge
            variant="secondary"
            className="absolute top-3 left-3 bg-white/95 text-slate-700 hover:bg-white border-0 shadow-sm"
          >
            {event.category?.name || "Event"}
          </Badge>

          <Badge className="absolute top-3 right-3 bg-amber-600 text-white border-0 shadow-sm">
            {(() => {
              const eventDate = new Date(event.start_date);
              const today = new Date();
              const diffTime = eventDate - today;
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays === 0
                ? "Today"
                : diffDays === 1
                ? "Tomorrow"
                : `${diffDays} days`;
            })()}
          </Badge>
        </div>

        <CardContent className="px-5">
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
              <Ticket className="w-4 h-4 ml-4 mr-2 text-amber-600" />
              <span>
                {event.ticket_categories.length > 0
                  ? `starting from ৳${Math.min(
                      ...event.ticket_categories.map((t) => parseFloat(t.price))
                    ).toFixed(2)}`
                  : "No tickets available"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
