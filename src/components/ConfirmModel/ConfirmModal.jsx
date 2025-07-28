import React from "react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Enhanced backdrop with stronger blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-300 ease-out"
        onClick={onClose}
      />
      
      {/* Modal container with glassmorphism effect */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 max-w-md w-full p-8 animate-in fade-in-0 zoom-in-95 duration-300 ease-out">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-3xl pointer-events-none" />
        
        <div className="relative space-y-6">
          {/* Icon container */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          
          {/* Message */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Confirm Action</h3>
            <p className="text-gray-600 leading-relaxed">{message}</p>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              className="flex-1 px-6 py-3 rounded-2xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
