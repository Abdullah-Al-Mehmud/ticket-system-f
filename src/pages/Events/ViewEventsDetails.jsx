import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Share2,
  Ticket,
  SquareUserRound,
  Mail,
} from "lucide-react";

import { Alert, AlertDescription } from "../../components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useGetEventByIdQuery } from "../../redux/features/event/EventApiSlice";

import EventModalForm from "./EventModalForm";

const ViewEventsDetails = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useGetEventByIdQuery(id);
  const event = data?.data;

  const handleLike = () => setIsLiked(!isLiked);

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

  const formatDateTimeRange = (start, end) => {
    const formattedStartTime = start.toLocaleTimeString("en-US", timeOptions);
    const formattedEndTime = end.toLocaleTimeString("en-US", timeOptions);
    return `${formattedStartTime} - ${formattedEndTime}`;
  };

  const formatDate = (start, end) => {
    const formattedStartDate = start.toLocaleDateString("en-US", dateOptions);
    const formattedEndDate = end.toLocaleDateString("en-US", dateOptions);
    return `${formattedStartDate} - ${formattedEndDate}`;
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const maxLength = 300;
  const descriptionText = event.event_description || "";

  const shortDescription =
    descriptionText.length > maxLength
      ? descriptionText.slice(0, maxLength) + "..."
      : descriptionText;

  // const availableQuantity = event.total_quantity - event.sold_quantity;
  // const soldPercentage = Math.round(
  //   (event.sold_quantity / event.total_quantity) * 100
  // );

  // Handle Modal

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="flex justify-end">
          <EventModalForm tcid={id} onSuccess={refetch} />
        </div>
        <div className="bg-white rounded-2xl shadow overflow-hidden mb-6">
          <div className="relative h-80">
            <img
              src={event.image_url}
              alt={event.title}
              className="object-cover w-full h-full"
            />
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
            <div className="bg-white rounded-xl shadow p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="font-semibold">{formatDate(start, end)}</p>
                      <p className="text-sm text-gray-500">Event Date</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="font-semibold">
                        {formatDateTimeRange(start, end)}
                      </p>
                      <p className="text-sm text-gray-500">Event Time</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="font-semibold">{event.location}</p>
                      <p className="text-sm text-gray-500">Location</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Ticket className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="font-semibold">
                        <span className="text-2xl">৳</span> {event.ticket_price}
                      </p>
                      <p className="text-sm text-gray-500">Ticket Price</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                About This Event
              </h2>
              <p className="text-gray-600">
                {showFullDescription ? descriptionText : shortDescription}
              </p>
              {descriptionText.length > maxLength && (
                <button
                  onClick={toggleDescription}
                  className="text-amber-600 hover:underline text-sm mt-1">
                  {showFullDescription ? "See less" : "See more"}
                </button>
              )}
            </div>

            {/* Card */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {event.ticket_categories?.map((ticket) => {
                const soldPercentage = Math.round(
                  (ticket.sold_quantity / ticket.total_quantity) * 100
                );
                const availableQuantity =
                  ticket.total_quantity - ticket.sold_quantity;

                return (
                  <Card
                    key={ticket.id}
                    className="shadow-lg rounded-xl border border-gray-200 overflow-hidden">
                    <CardHeader className="pb-2 pt-4 px-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-semibold text-gray-800">
                          {ticket.name}
                        </CardTitle>

                        <div className="bg-gray-100 text-gray-700 text-sm px-3 py-1 gap-1 rounded-md flex flex-row items-end">
                          <span className="font-medium">৳{ticket.price}</span>
                          <span className="text-sm text-gray-400">/price</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="px-4 pb-4 space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Sold</span>
                        <span className="font-medium">
                          {ticket.sold_quantity}/{ticket.total_quantity}
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300 ease-in-out"
                          style={{ width: `${soldPercentage}%` }}></div>
                      </div>

                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{soldPercentage}% sold</span>
                        <span>{availableQuantity} remaining</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organizer */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Organizer
              </h3>
              <div className="flex items-center gap-3 text-gray-700">
                <SquareUserRound className="w-4 h-4" />
                <span>{event.organizer?.name || "Unknown Organizer"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 mt-1">
                <Mail className="w-4 h-4" />
                <span className="text-sm">
                  {event.organizer?.email || "No email provided"}
                </span>
              </div>
            </div>

            {/* Privacy Note */}
            <Alert className="border-amber-200 bg-amber-50">
              <AlertDescription className="text-amber-800">
                <strong>Note:</strong> {event.privacy_policy}
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEventsDetails;
