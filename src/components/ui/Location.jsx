import { Clock, MapPin, Phone, ShoppingCart, Leaf } from 'lucide-react'
import React from 'react'

function Location({ getCartItemCount , setShowCart }) {
  return (
    <header className="relative h-screen bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
            clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-l from-green-600/80 to-transparent"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-3 rounded-2xl">
              <Leaf className="text-white" size={24} />
            </div>
            <div>
              <h2 className="font-bold text-xl text-gray-900">ZOC</h2>
              <p className="text-sm text-gray-600">Resto Café</p>
            </div>
          </div>
          
          <button 
            onClick={() => setShowCart && setShowCart(true)}
            className="relative bg-gray-100 hover:bg-gray-200 p-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ShoppingCart size={24} className="text-gray-700" />
            {getCartItemCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                {getCartItemCount()}
              </span>
            )}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-3xl">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block mb-8 font-semibold">
              ✨ Fresh • Authentic • Delicious
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 text-gray-900 leading-none">
              ZOC
              <span className="block text-green-600">RESTO CAFÉ</span>
            </h1>
            
            <p className="text-2xl text-gray-600 mb-12 leading-relaxed font-light backdrop-blur-md p-2 rounded-lg">
              Experience authentic flavors and exceptional dining at Manipal's finest resto café, where every dish is crafted with passion and tradition.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 mb-16">
              <button className="bg-green-600 hover:bg-green-700 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl">
                Explore Menu
              </button>
              <button className="border-2 border-gray-300 text-gray-700 hover:border-green-600 hover:text-green-600 px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300">
                Book Table
              </button>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-col md:flex-row gap-8 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <MapPin size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Mandavi Emerald Complex</p>
                  <p className="text-gray-600 text-sm">Vidyaratna Nagar, Manipal</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Phone size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">+91 6364 565 316</p>
                  <p className="text-gray-600 text-sm">Call for reservations</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Clock size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Open • Closes 11 PM</p>
                  <p className="text-gray-600 text-sm">Daily service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Location