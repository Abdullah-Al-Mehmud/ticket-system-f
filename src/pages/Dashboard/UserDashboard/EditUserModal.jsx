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
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData?.data?.name || "",
        email: userData?.data?.email || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ id: userId, ...formData }).unwrap();
      const updatedUser = {
        ...userData?.data,
        ...formData,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40">
      <div className="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-50 z-50"></div>
      {/* Modal content */}
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
