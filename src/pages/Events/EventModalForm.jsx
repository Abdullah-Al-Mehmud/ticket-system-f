import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateTicketCategoryMutation } from "../../redux/features/ticketcategories/ticketCategoriesApiSlice";
import toast from "react-hot-toast";

export default function EventModalForm({ tcid, onSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    event_id: tcid,
    name: "",
    price: "",
    sales_start: "",
    sales_end: "",
    total_quantity: "",
    sold_quantity: "",
  });

  const [createTicketCategory, { isLoading }] =
    useCreateTicketCategoryMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createTicketCategory(formData).unwrap();
      toast.success("Ticket category created successfully!");

      setFormData({
        event_id: tcid,
        name: "",
        price: "",
        sales_start: "",
        sales_end: "",
        total_quantity: "",
        sold_quantity: "",
      });
      setIsOpen(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error("Failed to create ticket category!");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      price: "",
      sales_start: "",
      sales_end: "",
      total_quantity: "",
      sold_quantity: "",
    });
    setIsOpen(false);
  };

  return (
    <div className="p-8">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
        Create Ticket Categories
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <Card className="border-0 shadow-none">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    Event Details
                  </CardTitle>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 text-xl font-bold w-6 h-6 flex items-center justify-center">
                    ×
                  </button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Event Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      Event Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Summer Music Festival"
                      required
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="89.99"
                      required
                    />
                  </div>

                  {/* Sales Start Date */}
                  <div>
                    <label
                      htmlFor="sales_start"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      Sales Start Date
                    </label>
                    <input
                      type="datetime-local"
                      id="sales_start"
                      name="sales_start"
                      value={formData.sales_start}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Sales End Date */}
                  <div>
                    <label
                      htmlFor="sales_end"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      Sales End Date
                    </label>
                    <input
                      type="datetime-local"
                      id="sales_end"
                      name="sales_end"
                      value={formData.sales_end}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Total Quantity */}
                  <div>
                    <label
                      htmlFor="total_quantity"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      Total Quantity
                    </label>
                    <input
                      type="number"
                      id="total_quantity"
                      name="total_quantity"
                      value={formData.total_quantity}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="500"
                      required
                    />
                  </div>

                  {/* Sold Quantity */}
                  <div>
                    <label
                      htmlFor="sold_quantity"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      Sold Quantity
                    </label>
                    <input
                      type="number"
                      id="sold_quantity"
                      name="sold_quantity"
                      value={formData.sold_quantity}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                      required
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors">
                      Save Event
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
