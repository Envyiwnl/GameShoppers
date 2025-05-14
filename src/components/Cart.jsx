import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const totalPrice = cartItems.length * 500;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-4xl text-white text-opacity-40 font-bold mb-6 border-b-[4px] border-gray-700 pb-2">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-400 text-lg">Your Cart is Empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="md:col-span-4 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className='text-white text-opacity-40'>{item.description}</p>
                  <p className="text-yellow-400 text-sm">⭐{item.rating}</p>
                  <p className="text-green-400 font-semibold mt-1">₹500</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 px-3 py-1 rounded hover:bg-red-900 hover:text-white transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md h-fit md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            <ul className="mb-4 space-y-2 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <li key={item.id} className="text-white text-opacity-40 flex justify-between">
                  <span className='truncate'>• {item.title}</span>
                  <span className='ml-4 text-green-400 whitespace-nowrap'>{item.price}</span>                  
                </li>
              ))}
            </ul>
            <p className="text-xl font-semibold mb-4 text-right">
              Total: ₹{totalPrice}
            </p>
            <button className="text-white border border-white-900 px-4 py-1 rounded hover:bg-black opacity-50 transition w-full"
                    onClick={()=> navigate('/payment')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;