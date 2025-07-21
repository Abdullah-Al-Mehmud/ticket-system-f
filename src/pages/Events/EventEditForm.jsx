import React, { useEffect, useState } from "react";
import { Calendar, MapPin, DollarSign, Upload } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateEventMutation,
  useGetEventByIdQuery,
} from "../../redux/features/event/EventApiSlice";
import { useGetCategoriesQuery } from "../../redux/features/categories/categoriesApiSlice";

const EventEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    event_description: "",
    location: "",
    start_date: "",
    end_date: "",
    ticket_price: "",
    status: "draft",
    privacy_policy: "",
    image_url: "",
  });

  const [errors, setErrors] = useState({});

  const { data: eventData, isLoading: loadingEvent } = useGetEventByIdQuery(id);
  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const { data: categories } = useGetCategoriesQuery();

  const CategoriesList = categories?.data || [];

  useEffect(() => {
    if (eventData?.data) {
      const {
        category_id,
        title,
        event_description,
        location,
        start_date,
        end_date,
        ticket_price,
        status,
        privacy_policy,
        image_url,
      } = eventData.data;

      setFormData({
        category_id: String(category_id),
        title,
        event_description,
        location,
        start_date: start_date?.slice(0, 10),
        end_date: end_date?.slice(0, 10),
        ticket_price: String(ticket_price),
        status,
        privacy_policy,
        image_url,
      });
    }
  }, [eventData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    if (formData.ticket_price === "" || isNaN(Number(formData.ticket_price)))
      newErrors.ticket_price = "Valid ticket price is required";
    if (!formData.privacy_policy.trim())
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

  const formatDateTime = (dateStr, hour = "10", minute = "00", second = "00") =>
    `${dateStr} ${hour}:${minute}:${second}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formattedData = {
      id,
      category_id: Number(formData.category_id),
      title: formData.title.trim(),
      event_description: formData.event_description.trim(),
      location: formData.location.trim(),
      start_date: formatDateTime(formData.start_date),
      end_date: formatDateTime(formData.end_date, "16", "00", "00"),
      ticket_price: parseFloat(formData.ticket_price),
      status: formData.status,
      privacy_policy: formData.privacy_policy.trim(),
      image_url: formData.image_url.trim(),
    };

    try {
      await updateEvent(formattedData).unwrap();
      toast.success("Event updated successfully!");
      navigate("/admin/events");
    } catch (err) {
      toast.error("Failed to update event. Please check the form.");
      console.error("Update error:", err);
    }
  };

  if (loadingEvent) return <p className="text-center p-8">Loading event...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white mb-2">Edit Event</h1>
            <p className="text-blue-100">Update the details for your event</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Category
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2">
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
              <label className="block text-sm font-semibold text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
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
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              />
              {errors.event_description && (
                <p className="text-red-500 text-sm">
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
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location}</p>
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
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.start_date && (
                  <p className="text-red-500 text-sm">{errors.start_date}</p>
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
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.end_date && (
                  <p className="text-red-500 text-sm">{errors.end_date}</p>
                )}
              </div>
            </div>

            {/* Ticket Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                <DollarSign size={16} /> Ticket Price
              </label>
              <input
                type="number"
                name="ticket_price"
                value={formData.ticket_price}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              />
              {errors.ticket_price && (
                <p className="text-red-500 text-sm">{errors.ticket_price}</p>
              )}
            </div>

            {/* Image URL + Preview */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Upload size={16} /> Image URL
              </label>
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              />
              {formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Event"
                  className="mt-3 w-full max-h-60 object-cover rounded-md"
                />
              )}
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
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2"
              />
              {errors.privacy_policy && (
                <p className="text-red-500 text-sm">{errors.privacy_policy}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              } text-white py-3 px-6 rounded-lg font-medium`}>
              {isLoading ? "Updating..." : "Update Event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventEditForm;
