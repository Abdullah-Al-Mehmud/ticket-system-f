import { useState, useEffect } from "react";
import { User, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  useUpdateUserMutation,
  useGetUserByIdQuery,
} from "../../redux/features/user/userApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import PageLoading from "../../components/LoderComponent/PageLoading";

export default function UserEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading: isFetching } = useGetUserByIdQuery(id);
  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    password_confirmation: "",
    image_url: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.data.name || "",
        email: user?.data.email || "",
        role: user?.data.role || "",
        password: "",
        password_confirmation: "",
        image_url: null,
      });
      setErrors({});
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.role) newErrors.role = "Role is required";

    if (formData.password && formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (
      formData.password &&
      formData.password !== formData.password_confirmation
    )
      newErrors.password_confirmation = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const data = new FormData();
    data.append("_method", "PATCH"); // Laravel will detect PATCH via POST
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("role", formData.role);

    if (formData.password) {
      data.append("password", formData.password);
      data.append("password_confirmation", formData.password_confirmation);
    }

    if (formData.image_url instanceof File) {
      data.append("image_url", formData.image_url);
    }

    try {
      // <-- FIX HERE: pass 'data' as 'data' key, not 'formData'
      await updateUser({ id, data }).unwrap();

      toast.success("User updated successfully!");
      navigate("/admin/user-list");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update user");
    }
  };

  if (isFetching) return <PageLoading />;

  return (
    <div className="max-w-2xl mx-auto py-8 px-6 mt-8 bg-white shadow-md border rounded-lg">
      <div className="flex items-center mb-6 space-x-2">
        <User className="w-5 h-5 text-gray-600" />
        <h1 className="text-xl font-semibold">Edit User</h1>
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Role */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Role</label>
        <select
          value={formData.role}
          onChange={(e) => handleInputChange("role", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.role ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          value={formData.password_confirmation}
          onChange={(e) =>
            handleInputChange("password_confirmation", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.password_confirmation && (
          <p className="text-red-500 text-sm">{errors.password_confirmation}</p>
        )}
      </div>

      {/* Image */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleInputChange("image_url", e.target.files[0])}
          className="w-full"
        />
        {formData.image_url && typeof formData.image_url === "object" && (
          <img
            src={URL.createObjectURL(formData.image_url)}
            alt="Preview"
            className="w-20 h-20 rounded mt-2 object-cover"
          />
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-800 text-white rounded text-base font-medium disabled:opacity-50 transition-all duration-300 ease-in-out group shadow-md hover:shadow-lg"
      >
        {isLoading ? <PageLoading /> : "Update"}
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>

      {isError && (
        <p className="mt-4 text-red-500 text-sm">
          Error: {error?.data?.message || "Update failed"}
        </p>
      )}
    </div>
  );
}
