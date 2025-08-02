import React, { useState } from 'react';
import { User, Phone, Mail, Calendar, MapPin, CreditCard, Building, Home, Utensils, Navigation } from 'lucide-react';
import bg from "../../assets/bg.jpeg"
export default function MessRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactNumber: '',
    gmailId: '',
    college: '',
    hostelResidency: '',
    location: '',
    paymentDuration: 'monthly',
    suggestions: '',
    collegeWorkplace: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getCurrentLocation = () => {
    setLocationLoading(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Using a reverse geocoding service to get address
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          const data = await response.json();
          
          const locationString = `📍 Current Location:
Coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}
Address: ${data.display_name || 'Address not found'}
Google Maps: https://maps.google.com/?q=${latitude},${longitude}`;

          setFormData(prev => ({
            ...prev,
            location: locationString
          }));
          
        } catch (error) {
          // Fallback to just coordinates if reverse geocoding fails
          const locationString = `📍 Current Location:
Coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}
Google Maps: https://maps.google.com/?q=${latitude},${longitude}`;

          setFormData(prev => ({
            ...prev,
            location: locationString
          }));
        }
        
        setLocationLoading(false);
      },
      (error) => {
        let errorMessage = 'Unable to get location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        setLocationError(errorMessage);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleSubmit = () => {
    // Format the data for WhatsApp message
    const message = `🍽️ *MESS REGISTRATION REQUEST*

👤 *Personal Information:*
• Name: ${formData.name}
• Address: ${formData.address}
• Contact Number: ${formData.contactNumber}
• Gmail ID: ${formData.gmailId}

🏢 *Institution Details:*
• College: ${formData.college}
• Hostel/Residency: ${formData.hostelResidency}
• College/Workplace: ${formData.collegeWorkplace}

📍 *Location:*
${formData.location}

💰 *Payment Details:*
• Payment Duration: ${formData.paymentDuration === 'monthly' ? 'Monthly' : 
                     formData.paymentDuration === 'halfmonth' ? 'Half Month (15 Days)' :
                     formData.paymentDuration === '1month' ? '1 Month' : 
                     formData.paymentDuration === '2months' ? '2 Months' : '6 Months'}

💭 *Suggestions:*
${formData.suggestions || 'None'}

Please confirm this registration and provide further details about payment and mess timings.`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/916364565316?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show success message
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div  style={{
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }} className="min-h-screen  flex items-center justify-center p-4">
        <div className="bg-black text-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border-4 border-gray-800">
          <div className="w-16 h-16 bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Utensils className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
          <p className="text-gray-300 mb-6">
            Welcome to our mess! Your registration has been submitted successfully. 
            We'll contact you soon with further details.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full bg-yellow-800 text-black hover:bg-gray-200 font-semibold py-3 rounded-lg transition-colors border-2 border-gray-300"
          >
            Register Another Person
          </button>
        </div>
      </div>
    );
  }

  return (
    <div  
     style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }}
    className="min-h-screen bg-white  py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <Utensils className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">ZOC Resto Cafe || Mess Registration</h1>
          <p className="text-gray-200 text-lg">Join our dining community and enjoy delicious meals daily</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-black">
          <div className="bg-black p-6">
            <h2 className="text-2xl font-bold text-white">Registration Form</h2>
            <p className="text-gray-300">Please fill in all the required information</p>
          </div>

          <div className="p-8 space-y-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-black border-b-2 border-black pb-2">
                Personal Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-600 transition-all bg-white text-black"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-600 transition-all bg-white text-black"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-black mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-600 transition-all bg-white text-black"
                    placeholder="Your complete address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Gmail ID *
                  </label>
                  <input
                    type="email"
                    name="gmailId"
                    value={formData.gmailId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-600 transition-all bg-white text-black"
                    placeholder="your.email@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    College *
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-600 transition-all bg-white text-black"
                    placeholder="Your college name"
                  />
                </div>
              </div>
            </div>

            {/* Accommodation & Location */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-black border-b-2 border-black pb-2">
                Accommodation & Location Details
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    <Home className="w-4 h-4 inline mr-2" />
                    Hostel/Residency *
                  </label>
                  <input
                    type="text"
                    name="hostelResidency"
                    value={formData.hostelResidency}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-600 transition-all bg-white text-black"
                    placeholder="Hostel/Residency name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    College/Workplace *
                  </label>
                  <input
                    type="text"
                    name="collegeWorkplace"
                    value={formData.collegeWorkplace}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-600 transition-all bg-white text-black"
                    placeholder="College or workplace name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-black mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location *
                  </label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        disabled={locationLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 rounded-lg transition-colors border-2 border-black"
                      >
                        <Navigation className="w-4 h-4" />
                        {locationLoading ? 'Getting Location...' : 'Get Current Location'}
                      </button>
                      <span className="text-sm text-gray-600 flex items-center">
                        or paste from Google Maps
                      </span>
                    </div>
                    {locationError && (
                      <p className="text-red-600 text-sm">{locationError}</p>
                    )}
                    <textarea
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-600 transition-all resize-none bg-white text-black"
                      placeholder="Click 'Get Current Location' for automatic detection or paste your location details from Google Maps here..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment & Suggestions */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-black border-b-2 border-black pb-2">
                Payment & Additional Information
              </h3>
              
              <div className="grid md:grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Payment Duration *
                  </label>
                  <select
                    name="paymentDuration"
                    value={formData.paymentDuration}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-600 transition-all bg-white text-black"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="halfmonth">Half Month (15 Days)</option>
                    <option value="1month">1 Month</option>
                    <option value="2months">2 Months</option>
                    <option value="6months">6 Months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Suggestions (Optional)
                  </label>
                  <textarea
                    name="suggestions"
                    value={formData.suggestions}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-600 transition-all resize-none bg-white text-black"
                    placeholder="Any suggestions or additional information you'd like to share..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t-2 border-black">
              <button
                onClick={handleSubmit}
                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg border-2 border-black"
              >
                Complete Registration
              </button>
              <p className="text-sm text-gray-500 text-center mt-3">
                By registering, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}