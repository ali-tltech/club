import React from 'react';
import { Clock, MapPin, Phone, ShoppingCart, Leaf, X } from 'lucide-react';
import FormFill from './FormFill'; // make sure this path is correct

function Location({ getCartItemCount, setShowCart, cart, getCartTotal, orderDetails, setOrderDetails, setShowOrderModal }) {
  return (
    <header className="relative h-screen bg-white overflow-hidden">
      {/* Right Side Background with Image and Overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden sm:block">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
            clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-l from-green-600/80 to-transparent"></div>
      </div>

      {/* Order Modal */}
      <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-green-50 border border-emerald-200 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="p-4 sm:p-6 text-sm sm:text-base">

            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-2xl font-bold text-emerald-800">
                Place Your Order
              </h2>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-emerald-500 hover:text-emerald-700 transition-colors duration-200"
              >
                <X size={20} className="sm:size-6" />
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-white border border-emerald-100 rounded-xl p-3 sm:p-4 mb-6 shadow-sm">
              <h3 className="font-bold text-base sm:text-lg text-emerald-800 mb-3">
                Order Summary
              </h3>
              <div className="space-y-2 text-xs sm:text-sm text-emerald-700">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t border-emerald-200 pt-2 mt-2">
                  <div className="flex justify-between font-bold text-sm sm:text-base text-emerald-900">
                    <span>Total:</span>
                    <span>₹{getCartTotal()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fill */}
            <FormFill
              setOrderDetails={setOrderDetails}
              orderDetails={orderDetails}
              setShowOrderModal={setShowOrderModal}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Location;
