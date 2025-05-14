import React from 'react'
import Card from './reusables/Card';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Home() {
    const[games, setGames]= useState([]);

    useEffect(()=> {
        axios.get('http://localhost:5000/api/games?platform=pc&sort-by=popularity')
        .then((response)=> {
            setGames(response.data.slice(0,100));
        })
        .catch((error) => {
            console.error("Error fetching games:", error);
        });
    },[]);
  return (
    <div className='p-6 text-white ml-14'>
        <h1 className='text-3xl font-bold mb-6'>Featured Games🔥</h1>
        <div className='flex flex-wrap gap-6'>
            {games.map((game)=> (
            <Card game={game} key={game.id} />
            ))}
        </div>
    </div>
  );
}

export default Home;