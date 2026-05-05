import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../../../store/features/user/userApiSlice";

const UserEdit = ({ isOpen, onClose, userId }) => {
  const { data: userData, isLoading } = useGetUserByIdQuery(userId);
  const [updateUser] = useUpdateUserMutation();

  const [showPreviousPassword, setShowPreviousPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    previousPassword: "",
    newPassword: "",
    // image_url: null,
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.data?.name || "",
        email: userData.data?.email || "",
        image_url: userData.data?.image_url || "",
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
    form.append("previousPassword", formData.previousPassword);
    form.append("newPassword", formData.newPassword);

    if (formData.image_url && typeof formData.image_url !== "string") {
      form.append("image_url", formData.image_url);
    }

    form.append("_method", "PATCH");

    try {
      await updateUser({ id: userId, data: form }).unwrap();

      const existingUser = JSON.parse(localStorage.getItem("data"));

      const updatedLocalUser = {
        ...existingUser,
        name: formData.name,
        email: formData.email,
      };

      localStorage.setItem("data", JSON.stringify(updatedLocalUser));

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
              {formData.image_url && typeof formData.image_url === "object" ? (
                <img
                  src={URL.createObjectURL(formData.image_url)}
                  alt="Preview"
                  className="w-20 h-20 rounded mt-2 object-cover"
                />
              ) : (
                formData.image_url &&
                typeof formData.image_url === "string" && (
                  <img
                    src={`${import.meta.env.VITE_IMG_URL}/${
                      formData.image_url
                    }`}
                    alt="Existing Profile"
                    className="w-20 h-20 rounded mt-2 object-cover"
                  />
                )
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Previous Password
              </label>
              <div className="relative">
                <input
                  type={showPreviousPassword ? "text" : "password"}
                  name="previousPassword"
                  value={formData.previousPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => setShowPreviousPassword(!showPreviousPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                  {showPreviousPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                  {showNewPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 text-white rounded">
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserEdit;
