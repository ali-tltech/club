import React, { useState } from 'react';
import { X, Eye, Phone, Mail, MapPin, Clock, Users, Calendar, Navigation } from 'lucide-react';
import bg from '../../assets/bg.jpg'
const SadhyaBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    guests: '',
    address: '',
    special: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setLocationLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          
          if (response.ok) {
            const data = await response.json();
            if (data.display_name) {
              setFormData({
                ...formData,
                address: data.display_name
              });
            }
          } else {
            const coordinatesAddress = `Coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            setFormData({
              ...formData,
              address: coordinatesAddress
            });
          }
        } catch (error) {
          const coordinatesAddress = `Coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setFormData({
            ...formData,
            address: coordinatesAddress
          });
        }
        
        setLocationLoading(false);
      },
      (error) => {
        setLocationLoading(false);
        let errorMessage = 'Unable to retrieve your location. ';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please enable location access and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
            break;
        }
        
        alert(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000
      }
    );
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.date || !formData.guests || !formData.address) {
      alert('Please fill in all required fields');
      return;
    }
    
    const message = `🌿 *NEW ONAM SADHYA BOOKING* 🌿

👤 Name: ${formData.name}
📱 Phone: ${formData.phone}
📅 Date: ${formData.date}
👥 Quantity: ${formData.guests}
📍 Address: ${formData.address}
${formData.special ? `📝 Special Requests: ${formData.special}` : ''}

Thank you for choosing our Onam Sadhya service! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/918086229572?text=${encodedMessage}`;

    setShowSuccess(true);
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
    }, 1000);
    setTimeout(() => {
      setFormData({
        name: '', phone: '', date: '', guests: '', address: '', special: ''
      });
      setShowSuccess(false);
    }, 3000);
  };

  const sadhyaItems = [
    { 
      id: 1, 
      name: 'Traditional Sadhya', 
      price: '₹450', 
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop', 
      items: ['Rice', 'Sambar', 'Rasam', 'Avial', 'Thoran', 'Pickle', 'Papadam'] 
    },
    { 
      id: 2, 
      name: 'Premium Sadhya', 
      price: '₹650', 
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop', 
      items: ['All Traditional items', 'Fish Curry', 'Prawns Fry', 'Banana Chips', 'Payasam'] 
    },
    { 
      id: 3, 
      name: 'Royal Sadhya', 
      price: '₹850', 
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop', 
      items: ['25+ dishes', 'Special curries', 'Multiple payasams', 'Premium ingredients', 'Exclusive items'] 
    }
  ];

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-green-400 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-6xl">🌿</div>
        <div className="absolute top-40 right-20 text-4xl">🍛</div>
        <div className="absolute bottom-40 left-20 text-5xl">🥥</div>
        <div className="absolute bottom-20 right-10 text-6xl">🌸</div>
      </div>

      <div className="container mx-auto px-2 py-2 relative z-10">
        {/* Header */}
        <header className="text-center mb-12 bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-3xl p-2 shadow-2xl border border-green-500 border-opacity-40">
          <h1 className="text-5xl md:text-6xl font-bold text-green-400 mb-4 drop-shadow-lg">
            🌿 Onam Sadhya Booking 🌿
          </h1>
          <p className="text-xl text-green-200 max-w-2xl mx-auto leading-relaxed">
            Experience Kerala's traditional feast. Book your authentic Onam Sadhya today!
          </p>
          <div className="mt-4 text-yellow-400 font-semibold">
            📅 Onam Special - September 5th, 2025
          </div>
        </header>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-950 bg-opacity-90 rounded-3xl shadow-2xl p-2 border border-green-600">

            <div className="text-center mb-8">
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-500 text-black px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 mx-auto hover:scale-105"
              >
                <Eye className="w-5 h-5" /> View Our Sadhya Menu
              </button>
            </div>

            <h2 className="text-3xl font-bold text-green-400 mb-8 text-center flex items-center justify-center gap-2">
              <Calendar className="w-8 h-8" /> Book Your Sadhya
            </h2>

            {showSuccess && (
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-black p-6 rounded-2xl mb-8 text-center shadow-lg animate-pulse">
                <h3 className="text-xl font-bold mb-2">✅ Booking Confirmed!</h3>
                <p>Your booking details are being sent via WhatsApp. Please wait...</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    placeholder="Full Name *" 
                    className="w-full px-4 py-3 border-2 border-green-700 rounded-xl focus:border-green-400 focus:outline-none bg-black text-green-300 transition-colors"
                    required
                  />
                </div>
                
                <div className="relative">
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    placeholder="Phone Number *" 
                    className="w-full px-4 py-3 border-2 border-green-700 rounded-xl focus:border-green-400 focus:outline-none bg-black text-green-300 transition-colors"
                    required
                  />
                </div>
                
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min="2025-09-05"
                    max="2025-09-05"
                    className="w-full px-4 py-3 border-2 border-green-700 rounded-xl focus:border-green-400 focus:outline-none bg-black text-green-300 transition-colors"
                    required
                  />
                  <div className="text-xs text-green-300 mt-1 opacity-75">
                    Onam Day: September 5th, 2025
                  </div>
                </div>
                
                <div className="relative">
                  <input 
                    type="number" 
                    name="guests" 
                    value={formData.guests} 
                    onChange={handleInputChange} 
                    min="1" 
                    max="100" 
                    placeholder="Number of Plates *" 
                    className="w-full px-4 py-3 border-2 border-green-700 rounded-xl focus:border-green-400 focus:outline-none bg-black text-green-300 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <textarea 
                  name="address" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  rows="3" 
                  placeholder="Delivery Address *" 
                  className="w-full px-4 py-3 border-2 border-green-700 rounded-xl focus:border-green-400 focus:outline-none bg-black text-green-300 pr-16 transition-colors resize-none"
                  required
                ></textarea>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={locationLoading}
                  className="absolute right-2 top-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-black p-2 rounded-lg transition-all duration-300 flex items-center gap-1 hover:scale-105"
                  title="Get current location"
                >
                  {locationLoading ? (
                    <div className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full"></div>
                  ) : (
                    <Navigation className="w-5 h-5" />
                  )}
                </button>
                <div className="text-xs text-green-300 mt-1 opacity-75 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Click the location button to auto-fill your address
                </div>
              </div>

              <div className="relative">
                <textarea 
                  name="special" 
                  value={formData.special} 
                  onChange={handleInputChange} 
                  rows="2" 
                  placeholder="Special Requests (Optional - dietary restrictions, extra items, etc.)" 
                  className="w-full px-4 py-3 border-2 border-green-700 rounded-xl focus:border-green-400 focus:outline-none bg-black text-green-300 transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                onClick={handleSubmit} 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-black py-4 px-8 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-wide hover:scale-105 flex items-center justify-center gap-2"
              >
                🚀 Book My Sadhya Now
              </button>
            </div>

            {/* Contact Info */}
            <div className="mt-8 bg-gradient-to-r from-gray-800 to-black p-6 rounded-2xl text-center text-green-300 border border-green-600">
              <h3 className="text-lg font-bold text-green-400 mb-4">Contact Information</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2 hover:text-green-200 transition-colors">
                  <Phone className="w-4 h-4 text-green-400" /> +91 80862-29575
                </div>
                <div className="flex items-center justify-center gap-2 hover:text-green-200 transition-colors">
                  <Mail className="w-4 h-4 text-green-400" /> onam@sadhya.com
                </div>
                <div className="flex items-center justify-center gap-2 hover:text-green-200 transition-colors">
                  <MapPin className="w-4 h-4 text-green-400" /> Manipal & nearby areas
                </div>
              </div>
              <div className="mt-4 text-xs text-green-400 opacity-75">
                🕐 Service Hours: 10:00 AM - 5:00 PM | 📞 For urgent queries, call us directly
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-gray-950 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-green-600 shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-black p-6 border-b border-green-700 flex justify-between items-center rounded-t-3xl">
              <h3 className="text-3xl font-bold text-green-400 flex items-center gap-2">
                🍛 Our Sadhya Menu
              </h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-2 hover:bg-gray-800 rounded-full transition-colors hover:scale-110"
              >
                <X className="w-6 h-6 text-green-400" />
              </button>
            </div>
            
            <div className="p-6">
             <img className='h-72 w-auto' src={bg} alt="" />
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default SadhyaBooking;
