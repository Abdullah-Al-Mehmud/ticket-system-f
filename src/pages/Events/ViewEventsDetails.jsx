import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Ticket, Tag, User, Info, DollarSign, Hash } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetEventsQuery } from "../../redux/features/event/EventApiSlice";

export default function ViewEventsDetails() {
  const { id } = useParams();
  console.log(id);
  const { data, isLoading, isError } = useGetEventsQuery();

  const event = data?.data?.find((event) => event.id === Number(id));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading event details...</p>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading event details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Event Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ID */}
            <div>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <Hash className="w-4 h-4" /> Event ID
              </p>
              <p className="font-medium text-gray-900">{event.id}</p>
            </div>

            {/* Event Name */}
            <div>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <Info className="w-4 h-4" /> Event Name
              </p>
              <p className="font-medium text-gray-900">{event.title}</p>
            </div>

            {/* Category */}
            <div>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <Tag className="w-4 h-4" /> Category
              </p>
              <p className="font-medium text-gray-900">{event.category?.name || "N/A"}</p>
            </div>

            {/* Organizer */}
            <div>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" /> Organizer
              </p>
              <p className="font-medium text-gray-900">{event.organizer?.name || "N/A"}</p>
            </div>

            {/* Status */}
            <div>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <Info className="w-4 h-4" /> Status
              </p>
              <Badge variant="outline" className="text-sm capitalize">{event.status}</Badge>
            </div>

            {/* Date & Time */}
            <div>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" /> Date & Time
              </p>
              <p className="font-medium text-gray-900">
                {event.start_date} — {event.end_date}
              </p>
            </div>

            {/* Location */}
            <div>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" /> Location
              </p>
              <p className="font-medium text-gray-900">{event.location}</p>
            </div>

            {/* Ticket Price */}
            <div>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="w-4 h-4" /> Price
              </p>
              <p className="font-medium text-gray-900">
                {event.ticket_price === 0 ? "Free" : `$${event.ticket_price}`}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
