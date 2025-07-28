import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Calendar,
  MapPin,
  User,
  Tag,
  Eye,
  Users,
  TrendingUp,
  DollarSign,
  Settings,
} from "lucide-react";
import {
  useDeleteEventMutation,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "../../redux/features/event/EventApiSlice";
import PageLoading from "../../components/LoderComponent/PageLoading";
import toast from "react-hot-toast";
import { useDeleteTicketCategoryMutation } from "../../redux/features/ticketcategories/ticketCategoriesApiSlice";
import TicketCategoryModal from "./TicketCategoryModal";

const EventDetailsAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useGetEventByIdQuery(id);
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  const [deleteTicketCategory] = useDeleteTicketCategoryMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const event = data?.data;
  const [activeTab, setActiveTab] = useState("overview");
  const [eventStatus, setEventStatus] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (event?.status) {
      setEventStatus(event.status);
    }
  }, [event]);

  const maxLength = 300;
  const descriptionText = event?.event_description || "";
  const shortDescription =
    descriptionText.length > maxLength
      ? descriptionText.slice(0, maxLength) + "…"
      : descriptionText;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <PageLoading />
      </div>
    );
  }
  if (isError || !event) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load event details.
      </div>
    );
  }

  const totalTickets = event.ticket_categories.reduce(
    (sum, t) => sum + t.total_quantity,
    0
  );
  const soldTickets = event.ticket_categories.reduce(
    (sum, t) => sum + t.sold_quantity,
    0
  );
  const totalRevenue = event.ticket_categories.reduce(
    (sum, t) => sum + t.sold_quantity * parseFloat(t.price),
    0
  );

  const daysUntil = Math.ceil(
    (new Date(event.start_date) - new Date()) / (1000 * 60 * 60 * 24)
  );

  const openCreateModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    refetch();
  };

  const handleDeleteCategory = async (id) => {
    await deleteTicketCategory(id);
    toast.success("Ticket category deleted");
    refetch();
  };

  const handleStatusUpdate = async () => {
    await updateEvent({ id: event.id, status: eventStatus });
    toast.success("Event status updated successfully!");
    refetch();
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(event?.id).unwrap();
      navigate("/admin/events");
      toast.success("Event deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete event.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {event.title}
              </h1>
              <div className="flex items-center space-x-4 mt-1">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    event.status === "Live"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {event.status}
                </span>
                <span className="text-sm text-gray-500">ID: #{event.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* ... same stats cards as before */}
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Tickets</p>
              <p className="text-2xl font-semibold text-gray-900">
                {totalTickets}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Sold Tickets</p>
              <p className="text-2xl font-semibold text-gray-900">
                {soldTickets}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <DollarSign className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${totalRevenue.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <Calendar className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Days Until Event
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {daysUntil}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 -mb-px">
              {[
                { id: "overview", name: "Overview", icon: Eye },
                { id: "tickets", name: "Tickets", icon: Tag },
                { id: "settings", name: "Settings", icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Info + Description */}
                <div className="space-y-6">
                  <div>
                    {/* Date / Time */}
                    <div className="flex items-start mb-4">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Date & Time
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(event.start_date)} –{" "}
                          {formatDate(event.end_date)}
                        </p>
                      </div>
                    </div>
                    {/* Location */}
                    <div className="flex items-start mb-4">
                      <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Location
                        </p>
                        <p className="text-sm text-gray-600">
                          {event.location}
                        </p>
                      </div>
                    </div>
                    {/* Organizer */}
                    <div className="flex items-start mb-4">
                      <User className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Organizer
                        </p>
                        <p className="text-sm text-gray-600">
                          {event.organizer.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {event.organizer.email}
                        </p>
                      </div>
                    </div>
                    {/* Category */}
                    <div className="flex items-start">
                      <Tag className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Category
                        </p>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            event.category.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {event.category.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Description
                    </h3>
                    <p className="text-sm text-gray-600">
                      {showFullDescription ? descriptionText : shortDescription}
                    </p>
                    {descriptionText.length > maxLength && (
                      <button
                        onClick={() =>
                          setShowFullDescription(!showFullDescription)
                        }
                        className="text-amber-600 hover:underline text-sm mt-1"
                      >
                        {showFullDescription ? "See less" : "See more"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Right column: Banner + Metadata */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Event Banner
                    </h3>
                    {event.image_url ? (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="rounded-lg object-cover w-full aspect-w-16 aspect-h-9"
                      />
                    ) : (
                      <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">No Banner</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Metadata
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Created:</span>
                        <span className="text-gray-900">
                          {formatDate(event.created_at)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Last Updated:</span>
                        <span className="text-gray-900">
                          {formatDate(event.updated_at)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Event ID:</span>
                        <span className="text-gray-900">#{event.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tickets Tab */}
            {activeTab === "tickets" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Ticket Categories
                  </h3>
                  <button
                    onClick={openCreateModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add New Ticket Type
                  </button>
                </div>

                {/* Modal */}
                <TicketCategoryModal
                  isOpen={isModalOpen}
                  onClose={handleModalClose}
                  initialData={selectedCategory}
                />
                <div className="space-y-4">
                  {event.ticket_categories.map((t) => {
                    const percent = (t.sold_quantity / t.total_quantity) * 100;
                    return (
                      <div key={t.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">
                              <Link to={`/admin/ticket-categories/${t.id}`}>
                                {t.name}
                              </Link>
                            </h4>
                            <p className="text-xs text-gray-500">ID: {t.id}</p>
                          </div>
                          <span className="text-2xl font-bold text-green-600">
                            ${t.price}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-xs text-gray-500 uppercase">
                              Total Quantity
                            </p>
                            <p className="text-lg font-semibold">
                              {t.total_quantity}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase">
                              Sold
                            </p>
                            <p className="text-lg font-semibold">
                              {t.sold_quantity}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase">
                              Available
                            </p>
                            <p className="text-lg font-semibold">
                              {t.total_quantity - t.sold_quantity}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase">
                              Revenue
                            </p>
                            <p className="text-lg font-semibold text-green-600">
                              $
                              {(t.sold_quantity * parseFloat(t.price)).toFixed(
                                2
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Sales Progress</span>
                            <span>{percent.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between text-sm text-gray-600">
                          <span>
                            Sales: {formatDate(t.sales_start)} –{" "}
                            {formatDate(t.sales_end)}
                          </span>
                          <div className="space-x-2">
                            <button
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => openEditModal(t)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleDeleteCategory(t.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Privacy Policy
                  </h3>
                  <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {event.privacy_policy}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Event Status
                  </h3>
                  <div className="flex items-center space-x-4">
                    <select
                      value={eventStatus}
                      onChange={(e) => setEventStatus(e.target.value)}
                      className="block w-48 px-3 py-2 border rounded-md"
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Live">Live</option>
                      <option value="Done">Done</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={handleStatusUpdate}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Danger Zone
                  </h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="text-red-800 font-medium mb-2">
                      Delete Event
                    </h4>
                    <p className="text-red-700 text-sm mb-4">
                      Once deleted, this cannot be undone.
                    </p>
                    <button
                      onClick={handleDeleteEvent}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Delete Event Permanently
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsAdmin;
