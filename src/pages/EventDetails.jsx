import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Share2,
  Heart,
  Ticket,
  Globe,
  Phone,
  Mail,
  Camera,
  Music,
  Utensils,
} from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { useGetEventByIdQuery } from "../redux/features/event/EventApiSlice";

const EventDetails = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const { id } = useParams();
  const { data, isLoading, isError } = useGetEventByIdQuery(id);
  const event = data?.data;

  const handleLike = () => setIsLiked(!isLiked);
  const handleRegister = () => setIsRegistered(!isRegistered);
  const handleShare = () => navigator.clipboard.writeText(window.location.href);

  if (isLoading)
    return <div className="text-center p-6">Loading event details...</div>;
  if (isError || !event)
    return (
      <div className="text-center p-6 text-red-500">
        Failed to load event details.
      </div>
    );

  const start = new Date(event.start_date);
  const end = new Date(event.end_date);

  const dateOptions = { day: "numeric", month: "short", year: "numeric" }; 
  const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true }; 

  function formatDateTimeRange(start, end) {
    const formattedStartTime = start.toLocaleTimeString("en-US", timeOptions);
    const formattedEndTime = end.toLocaleTimeString("en-US", timeOptions);
    return `${formattedStartTime} - ${formattedEndTime}`;
  }

  function formatDate(start, end) {
    const formattedStartDate = start.toLocaleDateString("en-US", dateOptions);
    const formattedEndDate = end.toLocaleDateString("en-US", dateOptions);
    return `${formattedStartDate} - ${formattedEndDate}`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6">
          <div className="relative h-80">
            <img
              src={event.image_url}
              alt={event.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div>
                <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
              </div>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleLike}
                className={`p-3 rounded-full backdrop-blur-sm ${
                  isLiked ? "bg-red-500" : "bg-white/20"
                } text-white`}>
                <Heart className="w-5 h-5" />
              </button>
              <button
                onClick={handleShare}
                className="p-3 rounded-full bg-white/20 text-white">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <div>
                      <div>
                        <p className="font-semibold">
                          {formatDate(start, end)}
                        </p>
                        <p className="text-sm text-gray-500">Event Date</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">
                        {formatDateTimeRange(start, end)}
                      </p>
                      <p className="text-sm text-gray-500">Event time</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">{event.location}</p>
                      <p className="text-sm text-gray-500">Location</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Users className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">
                        {event.attendees || 0} attending
                      </p>
                      <p className="text-sm text-gray-500">Join the crowd!</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Ticket className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">৳{event.ticket_price}</p>
                      <p className="text-sm text-gray-500">Ticket price</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Star className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">4.8/5 Rating</p>
                      <p className="text-sm text-gray-500">Based on reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                About This Event
              </h2>
              <p className="text-gray-600">{event.event_description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Join the Event
              </h3>
              <button
                onClick={handleRegister}
                className={`w-full py-3 px-4 rounded-lg font-semibold ${
                  isRegistered
                    ? "bg-green-600 text-white"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                }`}>
                {isRegistered ? "Registered ✓" : "Register Now"}
              </button>
            </div>

            {/* Organizer Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Organizer
              </h3>
              <div className="flex items-center gap-3 text-gray-700">
                <Music className="w-5 h-5 text-purple-600" />
                <span>{event.organizer.name || "Unknown Organizer"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 mt-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 mt-1">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{event.organizer.email}</span>
              </div>
            </div>

            {/* Alerts */}
            <Alert className="border-amber-200 bg-amber-50">
              <AlertDescription className="text-amber-800">
                <strong>Note:</strong> Bring a valid ID and your ticket
                confirmation.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
