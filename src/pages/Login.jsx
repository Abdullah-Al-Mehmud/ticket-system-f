import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/AuthApiSlice";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [login] = useLoginMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      const response = await login(formData).unwrap();

      localStorage.setItem("token", JSON.stringify(response.token));
      localStorage.setItem("data", JSON.stringify(response.data));

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      if (error?.data?.message) {
        setApiError(error.data.message);
      } else {
        setApiError("Login failed. Please check your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Demo credentials
  const demoCredentials = {
    admin: { email: "admin@gmail.com", password: "password" },
    organizer: { email: "organizer@gmail.com", password: "password" },
    user: { email: "user@gmail.com", password: "password" },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow border border-gray-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in to your account to continue
          </p>
        </div>

        {/* API error */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600 text-center">{apiError}</p>
          </div>
        )}

        {/* Form */}
        <div className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm text-amber-600 hover:text-amber-700 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Demo Login Buttons */}
          <div className="space-y-3">
            <div className="text-center">
              <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                Quick Demo Access
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormData(demoCredentials.admin)}
                className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-md border border-gray-200 transition-colors"
              >
                Demo Admin
              </button>
              <button
                type="button"
                onClick={() => setFormData(demoCredentials.organizer)}
                className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-md border border-gray-200 transition-colors"
              >
                Demo Organizer
              </button>
              <button
                type="button"
                onClick={() => setFormData(demoCredentials.user)}
                className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-md border border-gray-200 transition-colors"
              >
                Demo User
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-amber-600 text-white py-3 px-4 rounded-md font-medium hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Signup link */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
