import React, { createContext, useContext, useState } from 'react'

const CartContext= createContext();

export function CartProvider ({ children }){
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const exists = prevItems.find((i) => i.id === item.id);
            if (exists) return prevItems;
            return[...prevItems, item];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id != id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
        {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);