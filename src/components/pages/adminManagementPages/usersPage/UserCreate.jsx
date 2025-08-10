import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCreateUserMutation } from "../../../../store/features/user/userApiSlice";

const UserCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    password_confirmation: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [createUser] = useCreateUserMutation();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.role) newErrors.role = "Role is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      await createUser(formData).unwrap();
      toast.success("User created successfully!");
      navigate("/admin/user-list"); // Redirect to user list after successful creation
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        role: "",
        password: "",
        password_confirmation: "",
      });
    } catch (error) {
      if (error?.data?.errors) {
        setErrors(error.data.errors);
        toast.error("Failed to create user. Please check the errors.");
      } else {
        console.error("Error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Create New User</h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Role */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm mt-1">{errors.role}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm password"
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password_confirmation && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password_confirmation}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-800 transition-colors duration-300 ease-in-out group"
        >
          Create User
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Button>

        {submitSuccess && (
          <p className="text-green-600 text-sm mt-2 text-center">
            User created successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCreate;
