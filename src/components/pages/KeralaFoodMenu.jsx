import React, { useState } from 'react';
import { Star, MapPin, Clock, Phone, X, User, MapIcon, PhoneCall, MessageCircle, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import FormFill from '../ui/FormFill';
import Location from '../ui/Location';

const KeralaFoodMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    phone: '',
    address: '',
    specialInstructions: ''
  });

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitOrder = () => {
    if (!orderDetails.name || !orderDetails.phone || !orderDetails.address) {
      alert('Please fill in all required fields');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const cartItems = cart.map(item => 
      `• ${item.name} x${item.quantity} = ₹${item.price * item.quantity}`
    ).join('\n');

    const totalAmount = getCartTotal();
    const orderMessage = `🍽️ *New Order from ZOC Kerala Food Cafe*

📋 *Order Details:*
${cartItems}

💰 *Total Amount: ₹${totalAmount}*

👤 *Customer Details:*
• Name: ${orderDetails.name}
• Phone: ${orderDetails.phone}
• Address: ${orderDetails.address}

${orderDetails.specialInstructions ? `📝 *Special Instructions:*
${orderDetails.specialInstructions}` : ''}

Thank you for choosing ZOC Kerala Food Cafe! 🙏`;

    const whatsappURL = `https://wa.me/919746658679?text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappURL, '_blank');
    
    // Reset form and cart
    setOrderDetails({
      name: '',
      phone: '',
      address: '',
      specialInstructions: ''
    });
    setCart([]);
    setShowOrderModal(false);
    setShowCart(false);
  };

  const menuCategories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'breakfast', name: 'Breakfast', icon: '🌅' },
    { id: 'rice', name: 'Rice & Curry', icon: '🍚' },
    { id: 'seafood', name: 'Seafood', icon: '🐟' },
    { id: 'vegetarian', name: 'Vegetarian', icon: '🥬' },
    { id: 'snacks', name: 'Snacks', icon: '🥨' },
    { id: 'beverages', name: 'Beverages', icon: '☕' },
    { id: 'desserts', name: 'Desserts', icon: '🍮' }
  ];

  const getRandomImage = () => {
    const images = [
      'https://picsum.photos/300/200?random=1',
      'https://picsum.photos/300/200?random=2',
      'https://picsum.photos/300/200?random=3',
      'https://picsum.photos/300/200?random=4',
      'https://picsum.photos/300/200?random=5',
      'https://picsum.photos/300/200?random=6',
      'https://picsum.photos/300/200?random=7',
      'https://picsum.photos/300/200?random=8',
      'https://picsum.photos/300/200?random=9',
      'https://picsum.photos/300/200?random=10',
      'https://picsum.photos/300/200?random=11',
      'https://picsum.photos/300/200?random=12',
      'https://picsum.photos/300/200?random=13',
      'https://picsum.photos/300/200?random=14',
      'https://picsum.photos/300/200?random=15',
      'https://picsum.photos/300/200?random=16',
      'https://picsum.photos/300/200?random=17',
      'https://picsum.photos/300/200?random=18',
      'https://picsum.photos/300/200?random=19',
      'https://picsum.photos/300/200?random=20',
      'https://picsum.photos/300/200?random=21',
      'https://picsum.photos/300/200?random=22',
      'https://picsum.photos/300/200?random=23',
      'https://picsum.photos/300/200?random=24',
      'https://picsum.photos/300/200?random=25',
      'https://picsum.photos/300/200?random=26',
      'https://picsum.photos/300/200?random=27',
      'https://picsum.photos/300/200?random=28'
    ];
    return images;
  };

  const randomImages = getRandomImage();

  const menuItems = [
    // Breakfast
    { id: 1, name: 'Appam with Stew', category: 'breakfast', price: 120, description: 'Soft, fluffy rice pancakes served with aromatic coconut milk stew', image: randomImages[0], popular: true },
    { id: 2, name: 'Puttu & Kadala Curry', category: 'breakfast', price: 95, description: 'Steamed rice cake with spiced black chickpea curry', image: randomImages[1] },
    { id: 3, name: 'Dosa with Sambar', category: 'breakfast', price: 85, description: 'Crispy fermented crepe with lentil curry and coconut chutney', image: randomImages[2] },
    { id: 4, name: 'Idiyappam with Curry', category: 'breakfast', price: 110, description: 'String hoppers with coconut milk curry', image: randomImages[3] },
    
    // Rice & Curry
    { id: 5, name: 'Kerala Sadhya', category: 'rice', price: 350, description: 'Traditional feast with rice, sambar, rasam, avial, thoran, and payasam', image: randomImages[4], popular: true },
    { id: 6, name: 'Fish Curry Rice', category: 'rice', price: 180, description: 'Coconut-based fish curry with steamed rice', image: randomImages[5] },
    { id: 7, name: 'Chicken Curry Rice', category: 'rice', price: 160, description: 'Spicy Kerala-style chicken curry with rice', image: randomImages[6] },
    { id: 8, name: 'Beef Curry Rice', category: 'rice', price: 170, description: 'Tender beef in coconut curry with rice', image: randomImages[7] },
    
    // Seafood
    { id: 9, name: 'Karimeen Pollichathu', category: 'seafood', price: 320, description: 'Pearl spot fish marinated in spices, wrapped in banana leaf', image: randomImages[8], popular: true },
    { id: 10, name: 'Prawn Moilee', category: 'seafood', price: 280, description: 'Prawns in creamy coconut milk curry', image: randomImages[9] },
    { id: 11, name: 'Fish Mappas', category: 'seafood', price: 220, description: 'Fish in mild coconut milk curry with vegetables', image: randomImages[10] },
    { id: 12, name: 'Crab Roast', category: 'seafood', price: 380, description: 'Spicy roasted crab with Kerala spices', image: randomImages[11] },
    
    // Vegetarian
    { id: 13, name: 'Avial', category: 'vegetarian', price: 120, description: 'Mixed vegetables in coconut and curry leaves', image: randomImages[12] },
    { id: 14, name: 'Olan', category: 'vegetarian', price: 110, description: 'Ash gourd and black-eyed peas in coconut milk', image: randomImages[13] },
    { id: 15, name: 'Thoran', category: 'vegetarian', price: 95, description: 'Stir-fried vegetables with grated coconut', image: randomImages[14] },
    { id: 16, name: 'Sambar', category: 'vegetarian', price: 85, description: 'Tangy lentil curry with vegetables', image: randomImages[15] },
    
    // Snacks
    { id: 17, name: 'Banana Chips', category: 'snacks', price: 60, description: 'Crispy fried banana chips with a hint of salt', image: randomImages[16] },
    { id: 18, name: 'Parippu Vada', category: 'snacks', price: 45, description: 'Deep-fried lentil fritters', image: randomImages[17] },
    { id: 19, name: 'Unnakkai', category: 'snacks', price: 70, description: 'Sweet plantain stuffed with coconut and nuts', image: randomImages[18] },
    { id: 20, name: 'Kozhukatta', category: 'snacks', price: 55, description: 'Steamed rice dumplings with coconut filling', image: randomImages[19] },
    
    // Beverages
    { id: 21, name: 'Kerala Filter Coffee', category: 'beverages', price: 40, description: 'Strong South Indian coffee with milk', image: randomImages[20], popular: true },
    { id: 22, name: 'Tender Coconut Water', category: 'beverages', price: 50, description: 'Fresh coconut water straight from the shell', image: randomImages[21] },
    { id: 23, name: 'Buttermilk', category: 'beverages', price: 35, description: 'Spiced yogurt drink with curry leaves', image: randomImages[22] },
    { id: 24, name: 'Lime Juice', category: 'beverages', price: 45, description: 'Fresh lime juice with mint', image: randomImages[23] },
    
    // Desserts
    { id: 25, name: 'Payasam', category: 'desserts', price: 80, description: 'Traditional Kerala sweet pudding with jaggery', image: randomImages[24], popular: true },
    { id: 26, name: 'Halwa', category: 'desserts', price: 70, description: 'Sweet semolina pudding with ghee and nuts', image: randomImages[25] },
    { id: 27, name: 'Ela Ada', category: 'desserts', price: 65, description: 'Rice flour parcels with coconut jaggery filling', image: randomImages[26] },
    { id: 28, name: 'Neyyappam', category: 'desserts', price: 60, description: 'Sweet rice fritters with jaggery and ghee', image: randomImages[27] }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br  from-gray-50 to-gray-100">
      {/* Header */}
      <Location getCartItemCount={getCartItemCount} setShowCart={setShowCart} cart={cart}/>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Menu Categories</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {menuCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-black text-white shadow-lg transform scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-black'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
              {item.popular && (
                <div className="absolute top-3 right-3 bg-black text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 z-10">
                  <Star size={12} fill="white" />
                  <span>Popular</span>
                </div>
              )}
              
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                    <p className="text-2xl font-bold text-gray-800">₹{item.price}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.description}</p>
                
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-2 px-4 rounded-lg font-medium hover:from-black hover:to-gray-900 transform hover:scale-105 transition-all duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Special Offers */}
        <div className="mt-12 bg-gradient-to-r from-gray-700 to-black text-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">🎉 Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Breakfast Combo</h3>
              <p className="text-sm">Appam + Stew + Filter Coffee = ₹150 (Save ₹10)</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Family Feast</h3>
              <p className="text-sm">Kerala Sadhya for 4 people = ₹1200 (Save ₹200)</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-lg font-semibold text-gray-800 mb-2">Experience the True Taste of Kerala</p>
            <p className="text-sm">All dishes are prepared with authentic spices and traditional recipes passed down through generations.</p>
            <p className="text-xs mt-4 text-gray-500">Follow us on social media for daily specials and updates!</p>
          </div>
        </footer>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
  <div className="bg-green-50 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-100">
    <div className="p-6">
      {/* Cart Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-emerald-800 flex items-center">
          <ShoppingCart size={24} className="mr-2 text-emerald-600" />
          Your Cart ({getCartItemCount()})
        </h2>
        <button
          onClick={() => setShowCart(false)}
          className="text-emerald-500 hover:text-emerald-700"
        >
          <X size={24} />
        </button>
      </div>

      {/* Cart Items */}
      {cart.length === 0 ? (
        <div className="text-center py-10 text-emerald-500">
          <ShoppingCart size={48} className="mx-auto mb-4 text-emerald-200" />
          <p className="font-semibold">Your cart is empty</p>
          <p className="text-sm text-emerald-400">Add some delicious items to get started!</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-lg p-4 shadow border border-emerald-100">
                <div className="flex space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border border-emerald-100"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-emerald-800">{item.name}</h3>
                    <p className="text-emerald-600 text-sm">₹{item.price} each</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="bg-emerald-100 hover:bg-emerald-200 rounded-full p-1 text-emerald-700"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-medium text-lg text-emerald-800">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="bg-emerald-100 hover:bg-emerald-200 rounded-full p-1 text-emerald-700"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-emerald-800 text-lg">₹{item.price * item.quantity}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Total */}
          <div className="bg-emerald-100 rounded-lg p-4 mb-6 border border-emerald-200">
            <div className="flex justify-between items-center text-lg font-semibold text-emerald-800">
              <span>Total Amount:</span>
              <span>₹{getCartTotal()}</span>
            </div>
          </div>

          {/* Cart Actions */}
          <div className="flex space-x-3">
            <button
              onClick={() => setShowCart(false)}
              className="flex-1 px-4 py-2 border border-emerald-300 text-emerald-700 bg-white rounded-md hover:bg-emerald-100 font-medium"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => {
                setShowCart(false);
                setShowOrderModal(true);
              }}
              className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 font-medium"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  </div>
</div>

      )}

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
  <div className="bg-green-50 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-emerald-100 shadow-2xl">
    <div className="p-6">
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-emerald-800">Place Your Order</h2>
        <button
          onClick={() => setShowOrderModal(false)}
          className="text-emerald-500 hover:text-emerald-700"
        >
          <X size={24} />
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white border border-emerald-100 rounded-xl p-4 mb-6 shadow-sm">
        <h3 className="font-bold text-lg text-emerald-800 mb-3">Order Summary</h3>
        <div className="space-y-2 text-emerald-700">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name} x{item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t border-emerald-200 pt-2 mt-2">
            <div className="flex justify-between font-bold text-lg text-emerald-900">
              <span>Total:</span>
              <span>₹{getCartTotal()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Form */}
      <FormFill
        setOrderDetails={setOrderDetails}
        orderDetails={orderDetails}
        setShowOrderModal={setShowOrderModal}
      />
    </div>
  </div>
</div>

        </div>
      )}
    </div>
  );
};

export default KeralaFoodMenu;