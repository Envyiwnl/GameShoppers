import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function Card({ game }) {
  const [rating] =useState(() => (Math.random()* 1.5 + 3.5).toFixed(1));
  const navigate= useNavigate();
  const { addToCart } = useCart();

  const handleClick=()=> {
    navigate(`/product/${game.id}`,{
      state:{
        id:game.id,
        title:game.title,
        description:game.short_description,
        image:game.thumbnail,
        rating:rating,
        screenshots:game.screenshots,
      },
    });
  };

  const handleBuy = (e) => {
    e.stopPropagation();
    addToCart({
      id:game.id,
      title:game.title,
      image:game.thumbnail,
      price:'₹500',
      rating:rating,
      description:game.short_description,
    })
  }

  return (
    <div className='bg-gray-900 bg-opacity-90 border border-gray-600 rounded-xl p-4 w-64 shadow-md hover:shadow-xl transition-all hover:scale-105 duration-300 flex flex-col'
         onClick={handleClick}
    >
        <img src={game.thumbnail}
             title={game.title}
             className='h-40 w-full object-cover rounded-md mb-4'
        />
        <h2 className='text-white text-xl font-semibold mb-2'>{game.title}</h2>
        <p className='text-gray-300 text-sm flex-grow'>{game.short_description}</p>
        <p className='text-yellow-400 text-sm font-semibold mb-3'>⭐ {rating}/5</p>
        <div className='flex justify-end'>
            <button onClick={handleBuy} className='text-white border border-white-900 px-4 py-1 rounded hover:bg-black opacity-50 transition'>
                Buy
            </button>
        </div>
    </div>
  );
}

export default Card;