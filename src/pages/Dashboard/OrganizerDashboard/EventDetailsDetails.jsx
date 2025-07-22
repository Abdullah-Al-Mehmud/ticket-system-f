import React from "react";
import {
  Calendar,
  MapPin,
  Tag,
  User,
  Info,
  DollarSign,
  Hash,
  Clock,
  Star,
  Share2,
  Heart,
  Shield,
} from "lucide-react";
import { useGetEventByIdQuery } from "../../../redux/features/event/EventApiSlice";
import { useParams } from "react-router-dom";

const formatDateTime = (datetime) => {
  const date = new Date(datetime);
  return date.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });
};

const formatDateRange = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  const options = { month: "short", day: "numeric", year: "numeric" };
  return `${s.toLocaleDateString("en-US", options)} - ${e.toLocaleDateString(
    "en-US",
    options
  )}`;
};

const EventDetailsDesign = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetEventByIdQuery(id);

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (isError || !data?.data)
    return (
      <div className="p-10 text-center text-red-500">Failed to load event.</div>
    );

  const event = data.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10"></div>
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-end p-8">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                🎉 {event.title}
              </h1>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {formatDateRange(event.start_date, event.end_date)}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 bg-green-500 px-3 py-1 rounded-full">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-bold">
                    ৳{parseFloat(event.ticket_price)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 z-20 flex gap-3">
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all p-3 rounded-full">
              <Heart className="w-5 h-5 text-white" />
            </button>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all p-3 rounded-full">
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Description */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-indigo-600" />
                About This Event
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {event.event_description}
              </p>
            </div>

            {/* Event Timeline */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-indigo-600" />
                Event Schedule
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Start Date & Time
                    </p>
                    <p className="text-indigo-600 font-medium">
                      {formatDateTime(event.start_date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      End Date & Time
                    </p>
                    <p className="text-purple-600 font-medium">
                      {formatDateTime(event.end_date)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-lg text-white">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Ticket Price
              </h3>
              <div className="text-3xl font-bold mb-4">
                {parseFloat(event.ticket_price) === 0
                  ? "FREE"
                  : `৳${parseFloat(event.ticket_price)}`}
              </div>
              {/* <button className="w-full bg-white text-green-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors">
                Get Tickets Now
              </button> */}
            </div>
            {/* Event Details Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Event Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Hash className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Event ID</p>
                    <p className="font-semibold text-gray-800">#{event.id}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mt-1">
                      {event.category.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Organizer</p>
                    <p className="font-semibold text-gray-800">
                      {event.organizer.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 capitalize ${
                        event.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                Location
              </h3>
              <p className="text-gray-700 mb-4">{event.location}</p>
              {/* <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Map view would appear here
                </p>
                <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg mt-2 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-gray-400" />
                </div>
              </div> */}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-500" />
                Privacy Policy
              </h3>
              <p className="text-gray-700 mb-4">{event.privacy_policy}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsDesign;
