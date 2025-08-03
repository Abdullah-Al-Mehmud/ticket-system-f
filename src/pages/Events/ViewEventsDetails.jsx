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
  Edit,
  Trash2,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import {
  useAssignOrganizerMutation,
  useDeleteEventMutation,
  useGetEventByIdQuery,
  useUpdateEventStatusMutation,
} from "../../redux/features/event/EventApiSlice";
import PageLoading from "../../components/LoderComponent/PageLoading";
import toast from "react-hot-toast";
import { useDeleteTicketCategoryMutation } from "../../redux/features/ticketcategories/ticketCategoriesApiSlice";
import TicketCategoryModal from "./TicketCategoryModal";
import ConfirmModal from "../../components/ConfirmModel/ConfirmModal";
import { useGetUserListQuery } from "../../redux/features/user/userApiSlice";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
} from "../../components/ui/command";

const EventDetailsAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useGetEventByIdQuery(id);
  const [updateEventStatus] = useUpdateEventStatusMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const { data: usersData, isLoading: isUsersLoading } = useGetUserListQuery();
  const users = usersData?.data;
  const [assignOrganizer] = useAssignOrganizerMutation();

  const [deleteTicketCategory] = useDeleteTicketCategoryMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [showConfirmInput, setShowConfirmInput] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  console.log(showModal);

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

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setIsModalOpenDelete(true);
  };

  const confiramDelete = async () => {
    if (!userToDelete) return;
    await handleDeleteCategory(userToDelete);
    setIsModalOpenDelete(false);
    setUserToDelete(null);
  };

  const closeModal = () => {
    setIsModalOpenDelete(false);
    setUserToDelete(null);
  };

  const handleDeleteCategory = async (id) => {
    await deleteTicketCategory(id);
    toast.success("Ticket category deleted");
    refetch();
  };

  const handleStatusUpdate = async () => {
    await updateEventStatus({
      id: event.id,
      data: { status: eventStatus },
    }).unwrap();
    toast.success("Event status updated successfully!");
    refetch();
  };

  const handleConfirmClick = () => {
    if (confirmationText.toLowerCase() === "confirm") {
      handleDeleteEvent();
    } else {
      toast.error("You must type 'confirm' to delete.");
    }
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

  const handleAssignOrganizer = async () => {
    if (!selectedUsers.length) {
      toast.error("Please select at least one user.");
      return;
    }

    try {
      await Promise.all(
        selectedUsers.map((userId) =>
          assignOrganizer({ event_id: event.id, user_id: userId }).unwrap()
        )
      );

      toast.success("Organizer assigned successfully.");
      setShowModal(false);
      setSelectedUsers([]);
      refetch();
    } catch (err) {
      console.error("Assignment failed:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* ... same stats cards as before */}
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <Users className="h-8 w-8 text-amber-600" />
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
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                {/* Navigation Tabs - Left Side */}
                <nav className="flex space-x-8 -mb-px">
                  {[
                    { id: "overview", name: "Overview", icon: Eye },
                    { id: "tickets", name: "Tickets", icon: Tag },
                    { id: "settings", name: "Settings", icon: Settings },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
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

                {/* Title + Status - Right Side */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-right">
                  <h1 className="text-base font-semibold text-gray-900">
                    {event.title}
                  </h1>
                  <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                    <span
                      className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                        event.status === "Live"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-amber-600 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded transition duration-300 flex items-center gap-2"
                  >
                    Assign Organizer
                  </button>
                </div>
              </div>
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0  flex items-center justify-center z-50">
              <div className="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-40 -z-10"></div>
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
                <h2 className="text-lg font-semibold mb-4">Assign Organizer</h2>

                {isUsersLoading ? (
                  <p>Loading users...</p>
                ) : (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {selectedUsers.length > 0
                          ? `${selectedUsers.length} user(s) selected`
                          : "Select organizers..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search users..." />
                        <CommandGroup>
                          {users?.map((user) => (
                            <CommandItem
                              key={user.id}
                              onSelect={() => {
                                const isSelected = selectedUsers.includes(
                                  user.id
                                );
                                if (isSelected) {
                                  setSelectedUsers(
                                    selectedUsers.filter((id) => id !== user.id)
                                  );
                                } else {
                                  setSelectedUsers([...selectedUsers, user.id]);
                                }
                              }}
                            >
                              <div
                                className={cn(
                                  "mr-2 h-4 w-4 border border-primary rounded-sm flex items-center justify-center",
                                  selectedUsers.includes(user.id)
                                    ? "bg-primary text-primary-foreground"
                                    : "opacity-50"
                                )}
                              >
                                {selectedUsers.includes(user.id) && (
                                  <Check className="h-4 w-4" />
                                )}
                              </div>
                              {user.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}

                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAssignOrganizer}
                    className="bg-amber-600 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded transition duration-300 flex items-center gap-2"
                  >
                    Assign
                  </button>
                </div>
              </div>
            </div>
          )}

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
                    {/* Creator */}
                    <div className="flex items-start mb-4">
                      <User className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Event Creator
                        </p>
                        <p className="text-sm text-gray-600">
                          {event.creator.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {event.creator.email}
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
                      Organizers
                    </h3>

                    {event.organizers.length > 0 ? (
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Name
                              </th>
                              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                Email
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {event.organizers.map((org, index) => (
                              <tr
                                key={org.id}
                                className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <td className="px-6 py-4 text-sm text-gray-900">
                                  {org.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                  {org.email}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 mt-2">
                        No organizers assigned to this event.
                      </p>
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
                    className=" hover:bg-amber-600 hover:text-white text-amber-600 border-2 border-amber-600 font-medium py-1 px-4 rounded transition duration-300 flex items-center gap-1"
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

                <div className="bg-white rounded-lg shadow">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ticket Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sold / Total
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Progress
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Revenue
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sales Period
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {event.ticket_categories.map((t) => {
                          const percent =
                            (t.sold_quantity / t.total_quantity) * 100;
                          const available = t.total_quantity - t.sold_quantity;
                          const revenue = (
                            t.sold_quantity * parseFloat(t.price)
                          ).toFixed(2);

                          return (
                            <tr key={t.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="flex items-center">
                                    <a
                                      href={`/admin/ticket-categories/${t.id}`}
                                      className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                                    >
                                      {t.name}
                                      <Eye className="w-4 h-4 text-amber-600" />
                                    </a>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    ID: {t.id}
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-lg font-semibold text-amber-600">
                                  ${t.price}
                                </span>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  <span className="font-medium">
                                    {t.sold_quantity}
                                  </span>{" "}
                                  / {t.total_quantity}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {available} available
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                    <div
                                      className="bg-amber-600 h-2 rounded-full"
                                      style={{ width: `${percent}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-gray-600">
                                    {percent.toFixed(1)}%
                                  </span>
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm font-semibold text-amber-600">
                                  ${revenue}
                                </span>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center text-xs text-gray-500">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  <div>
                                    <div>{formatDate(t.sales_start)}</div>
                                    <div>to {formatDate(t.sales_end)}</div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => openEditModal(t)}
                                    className="text-amber-600 hover:text-amber-800 p-1"
                                    title="Edit"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteClick(t.id)}
                                    className="text-red-600 hover:text-red-800 p-1"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <ConfirmModal
                  isOpen={isModalOpenDelete}
                  onClose={closeModal}
                  onConfirm={confiramDelete}
                  message="Are you sure you want to delete this Ticket Categories ?"
                />
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
                    <div className="space-y-4">
                      {!showConfirmInput ? (
                        <button
                          onClick={() => setShowConfirmInput(true)}
                          className="bg-red-600 text-white px-5 py-2.5 rounded-md hover:bg-red-700 transition-colors"
                        >
                          Delete Event Permanently
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Type{" "}
                            <span className="font-semibold text-red-600">
                              confirm
                            </span>{" "}
                            to permanently delete this event:
                          </label>
                          <input
                            type="text"
                            placeholder="confirm"
                            value={confirmationText}
                            onChange={(e) =>
                              setConfirmationText(e.target.value)
                            }
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                          <div className="flex gap-3">
                            <button
                              onClick={handleConfirmClick}
                              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                            >
                              Confirm Delete
                            </button>
                            <button
                              onClick={() => {
                                setShowConfirmInput(false);
                                setConfirmationText("");
                              }}
                              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
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
