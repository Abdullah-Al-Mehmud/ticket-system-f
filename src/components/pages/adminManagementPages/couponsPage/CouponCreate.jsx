import {
  ArrowLeft,
  Calendar,
  DollarSign,
  FileText,
  Percent,
  Tag,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateCouponMutation } from "../../../../store/features/coupons/couponsApiSlice";

const CouponCreate = () => {
  const navigate = useNavigate();

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

  const [createCoupon, { isLoading }] = useCreateCouponMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.code.trim()) {
      toast.error("Coupon code is required");
      return;
    }
    if (!formData.discount_value) {
      toast.error("Discount value is required");
      return;
    }
    if (!formData.valid_until) {
      toast.error("Valid until date is required");
      return;
    }

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

      const res = await createCoupon(payload).unwrap();
      toast.success(res.message || "Coupon created successfully!");
      navigate("/admin/coupons-list", { state: { refresh: true } });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create coupon");
    }
  };

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
              Create Coupon
            </h2>
            <p className="text-gray-600 text-sm">
              Add a new discount coupon code
            </p>
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
                  placeholder="e.g. SPEAKER25, EARLY50"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent uppercase"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Code will be converted to uppercase
              </p>
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
                  placeholder={
                    formData.discount_type === "percentage" ? "25" : "500"
                  }
                  value={formData.discount_value}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Purchase Amount{" "}
                <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="number"
                name="min_purchase_amount"
                placeholder="0"
                value={formData.min_purchase_amount}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valid From <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="valid_from"
                  value={formData.valid_from}
                  onChange={handleChange}
                  min={minDate}
                  required
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
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Uses <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="number"
                name="max_uses"
                placeholder="100"
                value={formData.max_uses}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty for unlimited uses
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-gray-400">(optional)</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  name="description"
                  placeholder="e.g. 25% discount for speakers and partners"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
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
              {isLoading ? "Creating..." : "Create Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponCreate;
