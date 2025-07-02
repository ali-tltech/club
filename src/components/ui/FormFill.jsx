import {
  MapIcon,
  MessageCircle,
  PhoneCall,
  User,
} from 'lucide-react';
import React, { useState } from 'react';

function FormFill({ setShowOrderModal, orderDetails, setOrderDetails }) {
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = () => {
    if (!orderDetails.name || !orderDetails.phone || !orderDetails.address) {
      alert('Please fill in all required fields including the address.');
      return;
    }

    const message = `Order Details:\nName: ${orderDetails.name}\nPhone: ${orderDetails.phone}\nAddress: ${orderDetails.address}\nInstructions: ${orderDetails.specialInstructions || 'None'}`;
    const whatsappURL = `https://wa.me/918086229572?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            {
              headers: {
                "User-Agent": "murthasaalick123@gmail.com",
              },
            }
          );

          const data = await response.json();
          const address = data.address;

          const formattedAddress = [
            address.road,
            address.suburb,
            address.town || address.city,
            address.county,
            address.state,
            address.postcode,
            address.country,
          ]
            .filter(Boolean)
            .join(", ");

          setOrderDetails((prev) => ({
            ...prev,
            address: formattedAddress,
          }));
        } catch (error) {
          alert("Unable to fetch address from coordinates.");
          console.error(error);
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        alert("Location permission denied or unavailable.");
        console.error(error);
        setLoadingLocation(false);
      }
    );
  };

  return (
    <form className="space-y-5 bg-green-50 p-6 rounded-xl shadow-lg text-green-900 max-w-xl mx-auto">

      {/* Name */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          <User size={16} className="inline mr-1 text-emerald-600" />
          Full Name *
        </label>
        <input
          type="text"
          name="name"
          value={orderDetails.name}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          className="w-full px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          <PhoneCall size={16} className="inline mr-1 text-emerald-600" />
          Phone Number *
        </label>
        <input
          type="tel"
          name="phone"
          value={orderDetails.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
          className="w-full px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      {/* Address with Location Button */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          <MapIcon size={16} className="inline mr-1 text-emerald-600" />
          Delivery Address *
        </label>
        <textarea
          name="address"
          value={orderDetails.address}
          onChange={handleInputChange}
          placeholder="Enter your complete delivery address"
          rows="3"
          className="w-full px-3 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
        <button
          type="button"
          onClick={fetchCurrentLocation}
          className="mt-2 text-sm text-emerald-600 hover:underline disabled:opacity-50"
          disabled={loadingLocation}
        >
          {loadingLocation ? 'Fetching location...' : 'Use Current Location'}
        </button>
      </div>

      {/* Special Instructions */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          <MessageCircle size={16} className="inline mr-1 text-emerald-600" />
          Special Instructions (Optional)
        </label>
        <textarea
          name="specialInstructions"
          value={orderDetails.specialInstructions}
          onChange={handleInputChange}
          placeholder="Any special requests or dietary requirements..."
          rows="2"
          className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      {/* Buttons */}
      <div className="flex space-x-3 pt-2">
        <button
          type="button"
          onClick={() => setShowOrderModal(false)}
          className="flex-1 px-4 py-2 border border-emerald-400 text-emerald-700 bg-white rounded-md hover:bg-emerald-100"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmitOrder}
          className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 font-medium"
        >
          Order via WhatsApp
        </button>
      </div>
    </form>
  );
}

export default FormFill;
