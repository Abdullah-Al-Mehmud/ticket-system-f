import React, { useState } from "react";
import { Calendar, MapPin, DollarSign, Upload } from "lucide-react";
import { useCreateEventMutation } from "../../redux/features/event/EventApiSlice";
import { useGetCategoriesQuery } from "../../redux/features/categories/categoriesApiSlice";
import { toast } from "react-hot-toast";

const EventForm = () => {
  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    event_description: "",
    location: "",
    start_date: "",
    end_date: "",
    ticket_price: 0,
    status: "draft",
    privacy_policy: "",
    image_url: "",
  });

  const [errors, setErrors] = useState({});
  const [createEvent, { isLoading }] = useCreateEventMutation();
  const { data: categories } = useGetCategoriesQuery();
  // console.log("Categories:", categories?.data );
  const CategoriesList = categories?.data || [];

  // CategoriesList.map((category) => {

  //      console.log("Category:", category.name);
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "ticket_price" || name === "category_id"
          ? Number(value)
          : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category_id.trim()) newErrors.category_id = "ID is required";
    if (!formData.event_description.trim())
      newErrors.event_description = "Description is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.start_date) newErrors.start_date = "Start date is required";
    if (!formData.end_date) newErrors.end_date = "End date is required";
    if (!formData.ticket_price)
      newErrors.ticket_price = "Ticket price is required";
    if (!formData.privacy_policy)
      newErrors.privacy_policy = "Accept the privacy policy";

    if (
      formData.start_date &&
      formData.end_date &&
      new Date(formData.start_date) > new Date(formData.end_date)
    ) {
      newErrors.end_date = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(formData).unwrap();
      toast.success("Event created successfully!");
      navigate("/event-list");
    } catch (err) {
      toast.error("Failed to create event. Please check the form.");
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white mb-2">
              Create New Event
            </h1>
            <p className="text-blue-100">
              Fill out the details for your upcoming event
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Category_id */}
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500">
              <option value="">Select Categories</option>
              {CategoriesList.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Event Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                name="event_description"
                value={formData.event_description}
                onChange={handleChange}
                rows="4"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              {errors.event_description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.event_description}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                <MapPin size={16} /> Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                  <Calendar size={16} /> Start Date
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
                {errors.start_date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.start_date}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                  <Calendar size={16} /> End Date
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
                {errors.end_date && (
                  <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>
                )}
              </div>
            </div>

            {/* Ticket Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                <DollarSign size={16} /> Ticket Price (BDT)
              </label>
              <input
                type="number"
                name="ticket_price"
                value={formData.ticket_price}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              {errors.ticket_price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ticket_price}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Upload size={16} /> Upload Image
              </label>
              <input
                type="text"
                name="image_url"
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>

            {/* Privacy Policy */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Privacy Policy
              </label>
              <input
                type="text"
                name="privacy_policy"
                value={formData.privacy_policy}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              {errors.privacy_policy && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.privacy_policy}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              } text-white py-3 px-6 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]`}>
              {isLoading ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
