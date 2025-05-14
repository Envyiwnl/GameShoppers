import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { TbLogout } from "react-icons/tb";
import { auth } from '../../firebase';

function NavbarButtons({ user }) {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const hideTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(hideTimeoutRef.current);
    setShowCart(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(()=> {
      setShowCart(false);
    }, 300);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("LogOut Error:", error);
    }
  };

  return (
    <div className='ml-auto flex gap-4'>
      {!user ? (
        <>
          <Link to="/signup">
            <button className="text-white border border-white-900 px-4 py-1 rounded hover:bg-black opacity-50 transition">
              Signup
            </button>
          </Link>
          <Link to="/login">
            <button className="text-white border border-white-900 px-4 py-1 rounded hover:bg-black opacity-50 transition">
              Login
            </button>
          </Link>
        </>
      ) : (
        <>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaShoppingCart className="h-9 w-9 ml-2 p-2 rounded hover:bg-black opacity-50 transition text-white cursor-pointer" />

            {showCart && (
              <div className="absolute right-0 mt-2 w-64 bg-white bg-opacity-70 rounded-md shadow-lg z-50 p-3">
                {cartItems.length > 0 ? (
                  <>
                    <ul className="max-h-60 overflow-y-auto">
                      {cartItems.map((item, index) => (
                        <li key={index} className="text-black border-b py-1 flex items-start gap-2">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex flex-col">
                            <span className='text-sm font-semibold'>{item.title}</span>
                            <span className="text-xs text-gray-600">⭐ {item.rating || "N/A"}/5</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => navigate('/cart')}
                      className="mt-2 w-full text-center text-white bg-gray-800 py-1 rounded hover:bg-gray-700 transition"
                    >
                      Cart →
                    </button>
                  </>
                ) : (
                  <p className="text-gray-700">Your cart is empty</p>
                )}
              </div>
            )}
          </div>

          <Link to="/profile">
            <FaUserCircle className="h-9 w-9 ml-2 p-2 rounded hover:bg-black opacity-50 transition text-white" />
          </Link>
          <TbLogout
            onClick={handleLogout}
            className="h-9 w-9 ml-2 p-2 rounded hover:bg-black opacity-50 transition text-white cursor-pointer"
          />
        </>
      )}
    </div>
  );
}

export default NavbarButtons;