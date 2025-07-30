import React, { useState, useEffect } from "react";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../../redux/features/user/userApiSlice";
import toast from "react-hot-toast";

const EditUserModal = ({ isOpen, onClose, userId }) => {
  const { data: userData, isLoading } = useGetUserByIdQuery(userId);
  const [updateUser] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image_url: null,
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.data?.name || "",
        email: userData.data?.email || "",
        image_url: null, // Clear previous image
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image_url: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    if (formData.image_url) {
      form.append("image_url", formData.image_url);
    }
    form.append("_method", "PATCH"); // Laravel support

    try {
      await updateUser({ id: userId, data: form }).unwrap();
      const updatedFields = {
        name: form.get("name"),
        email: form.get("email"),
        image_url: form.get("image_url"),
      };

      const updatedUser = {
        ...userData?.data,
        ...updatedFields,
      };

      localStorage.setItem("data", JSON.stringify(updatedUser));
      toast.success("User updated successfully!");
      onClose();
    } catch (err) {
      console.error("Failed to update user", err);
      toast.error("Failed to update user");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
      <div className="absolute inset-0 bg-black opacity-50 z-40"></div>
      <div className="bg-white rounded-lg p-6 w-full max-w-md z-50">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Profile Image</label>
              <input
                type="file"
                name="image_url"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded"
              />
              {formData.image_url && typeof formData.image_url === "object" && (
                <img
                  src={URL.createObjectURL(formData.image_url)}
                  alt="Preview"
                  className="w-20 h-20 rounded mt-2 object-cover"
                />
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditUserModal;
