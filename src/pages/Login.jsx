import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
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
    user: { email: "user@gmail.com", password: "password" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded border border-gray-100 p-8 transition-all">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to continue</p>
        </div>

        {/* API Error */}
        {apiError && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-sm text-red-600 text-center">{apiError}</p>
          </div>
        )}

        {/* Form */}
        <div className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                  errors.email
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:border-amber-500"
                }`}
                placeholder="name@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                  errors.password
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:border-amber-500"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Demo Buttons */}
          <div className="space-y-3 mt-6">
            <div className="text-center">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded">
                Quick Demo Access
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(demoCredentials.admin)}
                className="text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded py-2 transition-all"
              >
                Admin Demo
              </button>
              <button
                type="button"
                onClick={() => setFormData(demoCredentials.user)}
                className="text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded py-2 transition-all"
              >
                User Demo
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded animate-spin"></div>
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

        {/* Sign Up Link */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-amber-600 hover:text-amber-700 transition-colors"
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
