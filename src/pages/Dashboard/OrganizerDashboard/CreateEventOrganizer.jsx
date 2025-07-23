import React, { useState } from "react";
import { Calendar, MapPin, DollarSign, Upload } from "lucide-react";
import { useCreateEventMutation } from "../../../redux/features/event/EventApiSlice";
import { useGetCategoriesQuery } from "../../../redux/features/categories/categoriesApiSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateEventOrganizer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category_id: null,
    title: null,
    event_description: null,
    location: null,
    start_date: null,
    end_date: null,
    ticket_price: null,
    privacy_policy: null,
    image_url: null,
  });

  const [errors, setErrors] = useState({});
  const [createEvent, { isLoading }] = useCreateEventMutation();
  const { data: categories } = useGetCategoriesQuery();
  const CategoriesList = categories?.data || [];

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
    if (!formData.category_id) newErrors.category_id = "Category is required";
    if (!formData.event_description.trim())
      newErrors.event_description = "Description is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.start_date) newErrors.start_date = "Start date is required";
    if (!formData.end_date) newErrors.end_date = "End date is required";
    if (formData.ticket_price === "" || formData.ticket_price < 0)
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

  const formatDateTime = (date) => {
    const d = new Date(date);
    return d.toISOString().slice(0, 19).replace("T", " ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...formData,
      start_date: formatDateTime(formData.start_date),
      end_date: formatDateTime(formData.end_date),
      ticket_price: parseFloat(formData.ticket_price),
    };

    try {
      await createEvent(payload).unwrap();
      toast.success("Event created successfully!");
      navigate("/organizer/event-management");
    } catch (err) {
      console.error("Error creating event:", err);
      toast.error(err?.data?.message);
      toast.error(err?.data?.errors);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-xl shadow-md border border-slate-200">
          <div className="bg-amber-600 px-8 py-6 rounded-t-xl">
            <h1 className="text-2xl font-bold text-white">Create New Event</h1>
            <p className="text-sm text-amber-100">
              Fill out the details for your upcoming event
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="">Select Category</option>
                {CategoriesList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category_id}
                </p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="event_description"
                value={formData.event_description}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              {errors.event_description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.event_description}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <MapPin size={16} /> Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Calendar size={16} /> Start Date
                </label>
                <input
                  type="datetime-local"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.start_date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.start_date}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Calendar size={16} /> End Date
                </label>
                <input
                  type="datetime-local"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.end_date && (
                  <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>
                )}
              </div>
            </div>

            {/* Ticket Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <DollarSign size={16} /> Ticket Price (BDT)
              </label>
              <input
                type="number"
                name="ticket_price"
                step="0.01"
                value={formData.ticket_price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              {errors.ticket_price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ticket_price}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Upload size={16} /> Image URL
              </label>
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>

            {/* Privacy Policy */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Privacy Policy
              </label>
              <input
                type="text"
                name="privacy_policy"
                value={formData.privacy_policy}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              {errors.privacy_policy && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.privacy_policy}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-amber-600 hover:bg-amber-700"
              } text-white py-3 px-6 rounded-lg font-medium transition-transform duration-150 hover:scale-105`}
            >
              {isLoading ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventOrganizer;
