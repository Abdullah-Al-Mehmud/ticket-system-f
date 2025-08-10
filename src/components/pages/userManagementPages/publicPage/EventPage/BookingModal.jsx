// components/modals/BookingModal.js
import React from "react";

const BookingModal = ({
  isOpen,
  onClose,
  onConfirm,
  totalTickets,
  totalAmount,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md">
        <h3 className="text-2xl font-bold mb-4">Booking Confirmation</h3>
        <p className="mb-6 text-gray-600">
          You're about to book <strong>{totalTickets}</strong> ticket(s) for{" "}
          <strong>৳{totalAmount.toFixed(2)}</strong>.
        </p>

        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 px-6 rounded-xl"
          >
            {isLoading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
