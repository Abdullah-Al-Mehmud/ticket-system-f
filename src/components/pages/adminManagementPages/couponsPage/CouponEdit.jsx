import PageLoading from "@/components/common/loaderComponent/PageLoading";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  DollarSign,
  Percent,
  Tag,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCouponByIdQuery,
  useUpdateCouponMutation,
} from "../../../../store/features/coupons/couponsApiSlice";

const CouponEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: couponData,
    isLoading: isFetching,
    isError: fetchError,
  } = useGetCouponByIdQuery(id);
  const [updateCoupon, { isLoading }] = useUpdateCouponMutation();

  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const minDate = getMinDate();

  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discount_type: "percentage",
    discount_value: "",
    min_purchase_amount: "",
    max_uses: "",
    valid_from: minDate,
    valid_until: "",
    applicable_events: "",
    applicable_ticket_types: "",
    allowed_user_types: "",
    is_active: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (couponData?.data) {
      const coupon = couponData.data;
      // Extract date from ISO format (e.g., "2026-05-07T00:00:00.000000Z" -> "2026-05-07")
      const extractDate = (dateString) => {
        if (!dateString) return "";
        return dateString.split("T")[0];
      };

      setFormData({
        code: coupon.code || "",
        description: coupon.description || "",
        discount_type: coupon.discount_type || "percentage",
        discount_value: coupon.discount_value || "",
        min_purchase_amount: coupon.min_purchase_amount || "",
        max_uses: coupon.max_uses || "",
        valid_from: extractDate(coupon.valid_from) || minDate,
        valid_until: extractDate(coupon.valid_until) || "",
        applicable_events: coupon.applicable_events?.join(", ") || "",
        applicable_ticket_types:
          coupon.applicable_ticket_types?.join(", ") || "",
        allowed_user_types: coupon.allowed_user_types?.join(", ") || "",
        is_active: coupon.is_active ?? true,
      });
    }
  }, [couponData, minDate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.code.trim()) newErrors.code = "Coupon code is required";
    if (!formData.discount_value)
      newErrors.discount_value = "Discount value is required";
    if (!formData.valid_until)
      newErrors.valid_until = "Valid until date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = {
        ...formData,
        applicable_events: formData.applicable_events
          ? formData.applicable_events.split(",").map((e) => e.trim())
          : [],
        applicable_ticket_types: formData.applicable_ticket_types
          ? formData.applicable_ticket_types.split(",").map((t) => t.trim())
          : [],
        allowed_user_types: formData.allowed_user_types
          ? formData.allowed_user_types.split(",").map((u) => u.trim())
          : [],
        min_purchase_amount: formData.min_purchase_amount
          ? parseFloat(formData.min_purchase_amount)
          : 0,
        max_uses: formData.max_uses ? parseInt(formData.max_uses) : null,
        discount_value: parseFloat(formData.discount_value),
      };

      const res = await updateCoupon({ id, ...payload }).unwrap();
      toast.success(res.message || "Coupon updated successfully!");
      navigate("/admin/coupons-list");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update coupon");
    }
  };

  if (isFetching) {
    return <PageLoading />;
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600">
            Unable to load coupon. Please try again.
          </p>
          <button
            onClick={() => navigate("/admin/coupons-list")}
            className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/admin/coupons-list")}
            className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Edit Coupon
            </h2>
            <p className="text-gray-600 text-sm">Update coupon details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coupon Code <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent uppercase ${
                    errors.code ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.code && (
                <p className="mt-1 text-sm text-red-500">{errors.code}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Type <span className="text-red-500">*</span>
              </label>
              <select
                name="discount_type"
                value={formData.discount_type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (৳)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Value <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                {formData.discount_type === "percentage" ? (
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                ) : (
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                )}
                <input
                  type="number"
                  name="discount_value"
                  value={formData.discount_value}
                  onChange={handleChange}
                  required
                  min="0"
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.discount_value
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
              </div>
              {errors.discount_value && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.discount_value}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Purchase Amount
              </label>
              <input
                type="number"
                name="min_purchase_amount"
                value={formData.min_purchase_amount}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valid From
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="valid_from"
                  value={formData.valid_from}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valid Until <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="valid_until"
                  value={formData.valid_until}
                  onChange={handleChange}
                  min={formData.valid_from}
                  required
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.valid_until
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
              </div>
              {errors.valid_until && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.valid_until}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Uses
              </label>
              <input
                type="number"
                name="max_uses"
                value={formData.max_uses}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/coupons-list")}
              className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-3 px-6 rounded-lg font-medium text-white transition-transform duration-150 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-amber-600 hover:bg-amber-700"
              }`}>
              {isLoading ? "Updating..." : "Update Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponEdit;
