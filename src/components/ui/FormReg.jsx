import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function FormReg({ onClose }) {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [slipPreview, setSlipPreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
    onClose();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSlipChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSlipPreview(URL.createObjectURL(file));
    } else {
      setSlipPreview(null); // Don't preview PDFs or unsupported types
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
  <div className="bg-gradient-to-t from-black via-gray-900 to-black rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn max-h-screen overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-black transition text-2xl"
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        {/* Title */}
        <h3 className="text-3xl font-bold text-center text-white mb-6">
          Membership Registration
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-gray-300 bg-stone-900 bg-opacity-15 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {/* Photo Upload with Preview */}
          {/* Photo and Slip Side-by-Side */}
<div className="flex flex-col md:flex-row gap-4">
  {/* Photo Upload */}
  <div className="w-full md:w-1/2">
    <label htmlFor="photo" className="block text-sm font-medium text-gray-200 mb-1">
      Upload Photo
    </label>
    <input
      id="photo"
      name="photo"
      type="file"
      accept="image/*"
      required
      onChange={handlePhotoChange}
      className="w-full file:mr-1 file:text-xs file:py-2 file:px-4 file:border-0 text-xs file:rounded-full file:bg-black file:text-white hover:file:bg-white"
    />
    {photoPreview && (
      <img
        src={photoPreview}
        alt="Photo Preview"
        className="mt-3 w-24 h-24 object-cover rounded-full border"
      />
    )}
  </div>

  {/* Payment Slip Upload */}
  <div className="w-full md:w-1/2">
    <label htmlFor="slip" className="block text-sm font-medium text-gray-200 mb-1">
      Payment Slip
    </label>
    <input
      id="slip"
      name="slip"
      type="file"
      accept="image/*,application/pdf"
      required
      onChange={handleSlipChange}
      className="w-full file:mr-4 file:py-2 text-xs file:text-xs file:px-4 file:border-0 file:rounded-full file:bg-black file:text-white hover:file:bg-white"
    />
    {slipPreview && (
      <img
        src={slipPreview}
        alt="Slip Preview"
        className="mt-3 w-3/4 h-24 object-cover rounded-md border"
      />
    )}
  </div>
</div>


          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-200 mb-1">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              type="text"
              required
              className="w-full rounded-lg border border-gray-300 bg-stone-900 bg-opacity-15 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="number" className="block text-sm font-medium text-gray-200 mb-1">
              Phone Number
            </label>
            <input
              id="number"
              name="number"
              type="tel"
              required
              placeholder="+1 234 567 8900"
              className="w-full rounded-lg border border-gray-300 bg-stone-900 bg-opacity-15 px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-white transition"
          >
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormReg;
