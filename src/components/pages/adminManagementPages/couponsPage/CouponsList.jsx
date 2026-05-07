import ConfirmModal from "@/components/common/confirmModel/ConfirmModal";
import TableRowSkeleton from "@/components/common/loaderComponent/TableRowSkeleton";
import {
  DollarSign,
  Edit,
  Eye,
  Percent,
  Plus,
  Search,
  Tag,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  useDeleteCouponMutation,
  useGetCouponsQuery,
} from "../../../../store/features/coupons/couponsApiSlice";

export default function CouponsList() {
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
    search: "",
  });
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);

  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useGetCouponsQuery(pageConfig);

  const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCouponMutation();

  const handleDeleteClick = (id) => {
    setCouponToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!couponToDelete) return;
    try {
      await deleteCoupon(couponToDelete).unwrap();
      toast.success("Coupon deleted successfully!");
      refetch();
    } catch {
      toast.error("Failed to delete the coupon.");
    } finally {
      setIsModalOpen(false);
      setCouponToDelete(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCouponToDelete(null);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const coupons = fetchData?.data || [];
  const currentPage = fetchData?.current_page || 1;
  const lastPage = fetchData?.last_page || 1;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              All Coupons
            </h1>
            <p className="mt-2 text-gray-600">Manage discount coupon codes</p>
          </div>
          <Link
            to="/admin/coupons-create"
            className="bg-amber-600 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded flex items-center gap-2">
            <Plus size={20} /> Create Coupon
          </Link>
        </div>

        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 flex gap-2 w-full flex-wrap">
              <div className="relative flex-1 min-w-[180px]">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by coupon code..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setPageConfig((prev) => ({ ...prev, search, page: 1 }));
                    }
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                onClick={() =>
                  setPageConfig((prev) => ({ ...prev, search, page: 1 }))
                }
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Search
              </button>

              <button
                onClick={() => {
                  setSearch("");
                  setPageConfig((prev) => ({
                    ...prev,
                    search: "",
                    page: 1,
                  }));
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium">
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {[
                    "ID",
                    "Code",
                    "Discount",
                    "Type",
                    "Uses",
                    "Valid From",
                    "Valid Until",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-4 text-left text-sm font-semibold text-gray-900 uppercase">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <TableRowSkeleton count={4} />
                ) : coupons.length > 0 ? (
                  coupons.map((coupon) => (
                    <tr
                      key={coupon.id}
                      className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">
                        #{coupon.id}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-amber-600" />
                          <span className="font-mono font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded">
                            {coupon.code}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800">
                        <div className="flex items-center gap-1">
                          {coupon.discount_type === "percentage" ? (
                            <Percent className="w-4 h-4 text-green-600" />
                          ) : (
                            <DollarSign className="w-4 h-4 text-green-600" />
                          )}
                          <span className="font-medium">
                            {coupon.discount_type === "percentage"
                              ? `${coupon.discount_value}%`
                              : `৳${coupon.discount_value}`}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 capitalize">
                        {coupon.discount_type}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            coupon.max_uses &&
                            coupon.used_count >= coupon.max_uses
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}>
                          {coupon.used_count || 0}
                          {coupon.max_uses ? ` / ${coupon.max_uses}` : ""}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {formatDate(coupon.valid_from)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {formatDate(coupon.valid_until)}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            coupon.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}>
                          {coupon.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <Link
                            to={`/admin/coupons-list/${coupon.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-md"
                            title="View">
                            <Eye size={16} />
                          </Link>
                          <Link
                            to={`/admin/coupons-edit/${coupon.id}`}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-md"
                            title="Edit">
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(coupon.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-md"
                            title="Delete"
                            disabled={isDeleting}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-6 text-sm text-gray-500">
                      No coupons found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {lastPage > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <button
            onClick={() =>
              setPageConfig((prev) => ({
                ...prev,
                page: Math.max(1, currentPage - 1),
              }))
            }
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm rounded-md border transition ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                : "bg-white hover:bg-amber-100 text-gray-700 border-gray-300"
            }`}>
            Previous
          </button>

          {[...Array(lastPage)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() =>
                  setPageConfig((prev) => ({ ...prev, page: pageNum }))
                }
                className={`px-4 py-2 text-sm rounded-md border transition ${
                  pageNum === currentPage
                    ? "bg-amber-600 text-white border-amber-600"
                    : "bg-white hover:bg-amber-100 text-gray-700 border-gray-300"
                }`}>
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() =>
              setPageConfig((prev) => ({
                ...prev,
                page: Math.min(lastPage, currentPage + 1),
              }))
            }
            disabled={currentPage === lastPage}
            className={`px-4 py-2 text-sm rounded-md border transition ${
              currentPage === lastPage
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                : "bg-white hover:bg-amber-100 text-gray-700 border-gray-300"
            }`}>
            Next
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this coupon?"
      />
    </div>
  );
}
