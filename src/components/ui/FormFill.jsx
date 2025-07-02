import {
  MapIcon,
  MessageCircle,
  PhoneCall,
  User,
} from 'lucide-react';
import React from 'react';

function FormFill({ setShowOrderModal, orderDetails, setOrderDetails }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = () => {
    const message = `Order Details:\nName: ${orderDetails.name}\nPhone: ${orderDetails.phone}\nAddress: ${orderDetails.address}\nInstructions: ${orderDetails.specialInstructions}`;
    const whatsappURL = `https://wa.me/918086229572?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const address = data.display_name || `Lat: ${latitude}, Lng: ${longitude}`;
            setOrderDetails((prev) => ({
              ...prev,
              address,
            }));
          } catch (error) {
            alert("Unable to fetch address from coordinates.");
          }
        },
        () => {
          alert("Permission denied or unable to fetch location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <form className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <User size={16} className="inline mr-1" />
          Full Name *
        </label>
        <input
          type="text"
          name="name"
          value={orderDetails.name}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <PhoneCall size={16} className="inline mr-1" />
          Phone Number *
        </label>
        <input
          type="tel"
          name="phone"
          value={orderDetails.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
      </div>

      {/* Address with Location Button */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <MapIcon size={16} className="inline mr-1" />
          Delivery Address *
        </label>
        <textarea
          name="address"
          value={orderDetails.address}
          onChange={handleInputChange}
          placeholder="Enter your complete delivery address"
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
        <button
          type="button"
          onClick={fetchCurrentLocation}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          Use Current Location
        </button>
      </div>

      {/* Special Instructions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <MessageCircle size={16} className="inline mr-1" />
          Special Instructions (Optional)
        </label>
        <textarea
          name="specialInstructions"
          value={orderDetails.specialInstructions}
          onChange={handleInputChange}
          placeholder="Any special requests or dietary requirements..."
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={() => setShowOrderModal(false)}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmitOrder}
          className="flex-1 bg-gradient-to-r from-gray-800 to-black text-white px-4 py-2 rounded-lg hover:from-black hover:to-gray-900 font-medium"
        >
          Order via WhatsApp
        </button>
      </div>
    </form>
  );
}

export default FormFill;
