import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetEventsQuery } from "../redux/features/event/EventApiSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Wine,
  Music,
  Palette,
  BookOpen,
  Camera,
} from "lucide-react";
import { Link } from "react-router-dom";

const Event = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data, isLoading, isError } = useGetEventsQuery();
  const events = data?.data ?? [];

  const categories = [
    { id: "all", label: "All Events", icon: Calendar },
    { id: "Food & Drink", label: "Food & Drink", icon: Wine },
    { id: "Music", label: "Music", icon: Music },
    { id: "Art", label: "Art", icon: Palette },
    { id: "Photography", label: "Photography", icon: Camera },
    { id: "Literature", label: "Literature", icon: BookOpen },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category_id?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || event.category_id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const EventCard = ({ event }) => {
    return (
      <Link
        to={`/event-details/${event.id}`}
        key={event.id}
        className="group block"
      >
        <Card className="overflow-hidden border-0 shadow-sm rounded-md  transition-all duration-300  bg-white p-0 gap-3">
          <div className="relative">
            {event.image_url ? (
              <>
                <img
                  src={event.image_url}
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
                  <span className="text-xl font-bold text-slate-900 ">
                    TapKori
                  </span>
                </div>
              </>
            ) : (
              <div className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 bg-gray-200 flex items-center justify-center">
                <span className="text-6xl font-bold text-slate-400">
                  TapKori
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Badge
              variant="secondary"
              className="absolute top-3 left-3 bg-white/95 text-slate-700 hover:bg-white border-0 shadow-sm"
            >
              {event.category?.name || "Event"}
            </Badge>
            {/* Days until event badge */}
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
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/20 to-orange-50/20">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Amazing
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                {" "}
                Events
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find and book the perfect events for your interests
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search events, locations, or categories..."
                className="pl-12 pr-4 py-4 text-base border-gray-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 rounded-full px-4 py-2 transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
                    : "bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:text-amber-600"
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="font-medium">{category.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {isError && (
          <div className="text-center py-20">
            <div className="text-red-500 text-lg mb-4">
              Failed to load events
            </div>
            <p className="text-gray-500">Please try again later</p>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === "all" ? "All Events" : selectedCategory}
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredEvents.length} event
                  {filteredEvents.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>

            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Calendar className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  No events found
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  {searchTerm
                    ? "Try adjusting your search terms or browse different categories."
                    : "No events match your current filters."}
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="rounded-full px-6 py-2 border-amber-300 text-amber-600 hover:bg-amber-50"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Event;
