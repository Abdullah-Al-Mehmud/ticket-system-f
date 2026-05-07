// components/modals/BookingModal.js
import { Tag } from "lucide-react";

const BookingModal = ({
  isOpen,
  onClose,
  onConfirm,
  totalTickets,
  totalAmount,
  discount,
  finalAmount,
  isLoading,
}) => {
  if (!isOpen) return null;

  const discountAmount = discount ? totalAmount - finalAmount : 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md">
        <h3 className="text-2xl font-bold mb-6">Booking Confirmation</h3>

        {/* Pricing Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tickets ({totalTickets})</span>
            <span className="font-semibold text-gray-900">
              ৳{totalAmount.toFixed(2)}
            </span>
          </div>

          {discount && (
            <>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="text-green-600 flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  Discount (
                  {discount.discount_type === "percentage"
                    ? `${discount.discount_value}%`
                    : `৳${discount.discount_value.toFixed(2)}`}
                  )
                </span>
                <span className="font-semibold text-green-600">
                  -৳{discountAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-300 font-bold text-lg">
                <span className="text-gray-900">Total</span>
                <span className="text-amber-600">
                  ৳{finalAmount.toFixed(2)}
                </span>
              </div>
            </>
          )}
        </div>

        <p className="mb-6 text-gray-600 text-center">
          {discount ? (
            <>
              You're saving <strong>৳{discountAmount.toFixed(2)}</strong>! 🎉
            </>
          ) : (
            <>
              You're about to book <strong>{totalTickets}</strong> ticket(s) for{" "}
              <strong>৳{(finalAmount || totalAmount).toFixed(2)}</strong>.
            </>
          )}
        </p>

        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-xl font-medium transition-colors">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200">
            {isLoading ? "Processing..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
