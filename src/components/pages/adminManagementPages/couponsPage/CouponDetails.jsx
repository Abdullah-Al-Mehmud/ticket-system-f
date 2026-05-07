import { ArrowLeft, Edit, Trash2, Tag, Percent, DollarSign, Calendar, FileText, Users } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useGetCouponByIdQuery,
  useDeleteCouponMutation,
} from "../../../../store/features/coupons/couponsApiSlice";
import PageLoading from "@/components/common/loaderComponent/PageLoading";
import ConfirmModal from "@/components/common/confirmModel/ConfirmModal";
import { useState } from "react";

const CouponDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useGetCouponByIdQuery(id);
  const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCouponMutation();

  const coupon = data?.data;

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = async () => {
    try {
      await deleteCoupon(id).unwrap();
      toast.success("Coupon deleted successfully!");
      navigate("/admin/coupons-list");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete coupon");
    } finally {
      setIsModalOpen(false);
    }
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError || !coupon) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">
            Unable to load coupon details.
          </p>
          <button
            onClick={() => navigate("/admin/coupons-list")}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/admin/coupons-list")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Coupons
        </button>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Tag className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white font-mono">
                    {coupon.code}
                  </h1>
                  <p className="text-amber-100 text-sm">
                    Coupon Details
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/admin/coupons-edit/${id}`)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    {coupon.discount_type === "percentage" ? (
                      <Percent className="w-5 h-5 text-amber-600" />
                    ) : (
                      <DollarSign className="w-5 h-5 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Discount</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {coupon.discount_type === "percentage"
                        ? `${coupon.discount_value}%`
                        : `৳${coupon.discount_value}`}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{coupon.discount_type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    coupon.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {coupon.is_active ? "Active" : "Inactive"}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Status</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Usage</p>
                    <p className="text-lg font-bold text-gray-900">
                      {coupon.used_count || 0}
                      {coupon.max_uses ? ` / ${coupon.max_uses}` : ''}
                    </p>
                    <p className="text-xs text-gray-500">
                      {coupon.max_uses ? `${coupon.max_uses - coupon.used_count} remaining` : 'Unlimited'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <FileText className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Description</p>
                    <p className="text-gray-900">
                      {coupon.description || "No description provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Valid Period</p>
                    <p className="text-gray-900">
                      {formatDate(coupon.valid_from)} - {formatDate(coupon.valid_until)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Min Purchase</p>
                    <p className="text-gray-900">
                      ৳{coupon.min_purchase_amount || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {coupon.applicable_events?.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 font-medium mb-2">Applicable Events</p>
                <div className="flex flex-wrap gap-2">
                  {coupon.applicable_events.map((eventId, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      Event #{eventId}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {coupon.allowed_user_types?.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 font-medium mb-2">Allowed User Types</p>
                <div className="flex flex-wrap gap-2">
                  {coupon.allowed_user_types.map((userType, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm capitalize">
                      {userType}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {coupon.applicable_ticket_types?.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 font-medium mb-2">Applicable Ticket Types</p>
                <div className="flex flex-wrap gap-2">
                  {coupon.applicable_ticket_types.map((typeId, idx) => (
                    <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Type #{typeId}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete coupon "${coupon.code}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default CouponDetails;