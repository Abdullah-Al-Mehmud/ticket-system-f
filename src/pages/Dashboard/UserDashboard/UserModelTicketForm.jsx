import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateTicketMutation } from "../../../redux/features/tickets/ticketsApiSlice";
import { ChevronDown } from 'lucide-react';

export default function UserModelTicketForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    ticket_category_id: '',
    quantity: ''
  });

  const [createTicket,{ isLoading }] = useCreateTicketMutation();

  // Sample ticket categories
  const ticketCategories = [
    { id: 'CAT-001', name: 'VIP Premium', price: '$199.99' },
    { id: 'CAT-002', name: 'General Admission', price: '$89.99' },
    { id: 'CAT-003', name: 'Student Discount', price: '$49.99' },
    { id: 'CAT-004', name: 'Early Bird', price: '$69.99' },
    { id: 'CAT-005', name: 'Group Package', price: '$299.99' }
  ];

  const selectedCategory = ticketCategories.find(cat => cat.id === formData.ticket_category_id);

  const handleQuantityChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      quantity: value
    }));
  };

  const handleCategorySelect = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      ticket_category_id: categoryId
    }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
   e.preventDefault();
   try{
    
   }
    console.log('Form submitted:', formData);
    // Handle form submission here
    setIsOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      ticket_category_id: '',
      quantity: ''
    });
    setIsOpen(false);
  };

  return (
    <div className="p-8 flex justify-end">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
      >
        Add Ticket Category
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <Card className="border-0 shadow-none">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    Select Ticket Category
                  </CardTitle>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 text-xl font-bold w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Ticket Category Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ticket Category
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent flex items-center justify-between"
                    >
                      <span className={selectedCategory ? 'text-gray-900' : 'text-gray-500'}>
                        {selectedCategory ? (
                          <div>
                            <span className="font-medium">{selectedCategory.name}</span>
                            <span className="text-sm text-gray-500 ml-2">{selectedCategory.price}</span>
                          </div>
                        ) : (
                          'Select a ticket category'
                        )}
                      </span>
                      <ChevronDown 
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {ticketCategories.map((category) => (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => handleCategorySelect(category.id)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-md last:rounded-b-md"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium text-gray-900">{category.name}</div>
                                <div className="text-xs text-gray-500">{category.id}</div>
                              </div>
                              <div className="text-sm font-semibold text-green-600">
                                {category.price}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity Input */}
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter quantity"
                  />
                </div>

                {/* Summary */}
                {selectedCategory && formData.quantity && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Order Summary</h4>
                    <div className="flex justify-between items-center text-sm">
                      <span>{selectedCategory.name} × {formData.quantity}</span>
                      <span className="font-semibold">
                        ${(parseFloat(selectedCategory.price.replace('$', '')) * parseInt(formData.quantity)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}