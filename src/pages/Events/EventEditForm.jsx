import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "../../redux/features/event/EventApiSlice";
import { useGetCategoriesQuery } from "../../redux/features/categories/categoriesApiSlice";
import { Upload } from "lucide-react";

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
    privacy_policy: "",
    status: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: eventData, isLoading: eventLoading } = useGetEventByIdQuery(id);
  const [updateEvent, { isLoading }] = useUpdateEventMutation();

  // Pre-fill form with fetched event data
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
        status,
        image_url,
      } = eventData.data;

      setFormData({
        category_id,
        title,
        event_description,
        location,
        start_date: start_date.slice(0, 16),
        end_date: end_date.slice(0, 16),
        privacy_policy,
        status,
      });

      if (image_url) {
        setImagePreview(`${import.meta.env.VITE_IMG_URL}/${image_url}`);
      }
    }
  }, [eventData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "category_id" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
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
    if (!formData.privacy_policy.trim())
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

  const formatForMySQL = (dateStr) => {
    const d = new Date(dateStr);
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

    const finalForm = new FormData();
    finalForm.append("_method", "PATCH"); // for Laravel
    finalForm.append("title", formData.title);
    finalForm.append("category_id", formData.category_id);
    finalForm.append("event_description", formData.event_description);
    finalForm.append("location", formData.location);
    finalForm.append("start_date", formatForMySQL(formData.start_date));
    finalForm.append("end_date", formatForMySQL(formData.end_date));
    finalForm.append("privacy_policy", formData.privacy_policy);
    finalForm.append("status", formData.status);
    if (imageFile) finalForm.append("image_url", imageFile);

    try {
      await updateEvent({ id, formData: finalForm }).unwrap();
      toast.success("Event updated successfully!");
      navigate("/admin/events");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed.");
    }
  };

  const categories = categoriesData?.data || [];
  if (eventLoading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Update Event
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category */}
          <div>
            <label className="block mb-1">Category</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-red-500 text-sm">{errors.category_id}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block mb-1">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="event_description"
              value={formData.event_description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.event_description && (
              <p className="text-red-500 text-sm">{errors.event_description}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Start Date</label>
              <input
                type="datetime-local"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.start_date && (
                <p className="text-red-500 text-sm">{errors.start_date}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">End Date</label>
              <input
                type="datetime-local"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.end_date && (
                <p className="text-red-500 text-sm">{errors.end_date}</p>
              )}
            </div>
          </div>

          {/* Image Upload + Preview */}
          <div>
            <label className="block mb-1 flex items-center gap-1">
              <Upload size={16} /> Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border px-3 py-2 rounded"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-40 mt-2 rounded"
              />
            )}
          </div>

          {/* Privacy Policy */}
          <div>
            <label className="block mb-1">Privacy Policy</label>
            <textarea
              name="privacy_policy"
              value={formData.privacy_policy}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.privacy_policy && (
              <p className="text-red-500 text-sm">{errors.privacy_policy}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select status</option>
              <option value="Live">Live</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Done">Done</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-amber-600 text-white rounded hover:bg-amber-700"
          >
            {isLoading ? "Updating..." : "Update Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventEditForm;
