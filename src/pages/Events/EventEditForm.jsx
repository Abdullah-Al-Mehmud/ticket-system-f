import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Upload } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useGetCategoriesQuery } from "../../redux/features/categories/categoriesApiSlice";
import {
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "../../redux/features/event/EventApiSlice";

const EventEditForm = () => {
  const { id } = useParams();
  // alert(id)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    event_description: "",
    location: "",
    start_date: "",
    end_date: "",
    privacy_policy: "",
    image_url: "",
    status: "",
  });
  console.log(formData);

  const [errors, setErrors] = useState({});
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: eventData, isLoading: eventLoading } = useGetEventByIdQuery(id);
  const [updateEvent, { isLoading }] = useUpdateEventMutation();

  useEffect(() => {
    if (eventData?.data) {
      const {
        category_id,
        title,
        event_description,
        location,
        start_date,
        end_date,
        privacy_policy,
        image_url,
        status,
      } = eventData.data;

      setFormData({
        category_id,
        title,
        event_description,
        location,
        privacy_policy,
        image_url,
        status,
        start_date: start_date.slice(0, 16),
        end_date: end_date.slice(0, 16),
      });
    }
  }, [eventData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "category_id" ? Number(value) : value,
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
    if (!formData.privacy_policy)
      newErrors.privacy_policy = "Privacy policy is required";

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
  const formatForMySQL = (dateStr) => {
    const d = new Date(dateStr);
    // Format to "YYYY-MM-DD HH:mm:ss"
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      id,
      ...formData,
      start_date: formatForMySQL(formData.start_date),
      end_date: formatForMySQL(formData.end_date),
    };

    try {
      const res = await updateEvent(payload).unwrap();
      console.log("Update response:", res);
      toast.success("Event updated successfully!");
      navigate("/admin/events");
    } catch (err) {
      console.error("Error updating event:", err);
      toast.error(err?.data?.message || "Update failed.");
    }
  };

  const CategoriesList = categoriesData?.data || [];

  if (eventLoading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800">Update Event</h1>
        <p className="text-sm text-gray-600 mb-6">
          Modify the details of your existing event
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2">
              <option value="">Select Category</option>
              {CategoriesList.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
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
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
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
                <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
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

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Privacy Policy
            </label>
            <textarea
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

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2">
              <option value="">Select status</option>
              <option value="Live">Live</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Done">Done</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-transform duration-150 ${
              isLoading
                ? "bg-amber-600 hover:bg-amber-800 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-800"
            }`}>
            {isLoading ? "Updating..." : "Update Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventEditForm;
