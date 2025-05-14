import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png'
import { ImSearch } from "react-icons/im";
import NavbarButtons from './NavbarButtons';
import { Link, useNavigate } from 'react-router-dom';

function Navbar( {user} ) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    const fetchGames = async () => {
      try {
        const res = await fetch (`http://localhost:5000/api/games`);
        const gamesData = await res.json();
        setGames(gamesData);
      } catch (err){
        console.error("Failed to fetch games:",err);
      }
    };
    fetchGames();
  },[]);

  useEffect(()=> {
    const fetchSuggestions = () => {
      if (query.length > 1) {
      
        const filtered = games.filter(game=>
            game.title.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered.slice(0,5));
      }else{
        setSuggestions([]);
      }
    };

    const debounce= setTimeout(() => {
      fetchSuggestions ();
    }, 300);

    return () => clearTimeout(debounce);

  }, [query, games]);

  const handleSelect = (game) => {
    navigate(`/product/${game.id}`, {state:{
      id: game.id,
      title:game.title,
      image: game.thumbnail,
      description: game.short_description,
      rating: Math.floor(Math.random() * 3) + 3.5
    }});
    setQuery('');
    setSuggestions([]);
  };

  const handleSearchSubmit=(e)=> {
    e.preventDefault();

    const trimmedQuery = query.trim().toLocaleLowerCase();
    if(!trimmedQuery) return;

    const matchedGame = games.find(game =>
      game.title.toLocaleLowerCase().includes(trimmedQuery)
    );

    if (matchedGame) {
      navigate(`/product/${matchedGame.id}`, {
        state: {
          id: matchedGame.id,
        title: matchedGame.title,
        image: matchedGame.thumbnail,
        description: matchedGame.short_description,
        rating: Math.floor(Math.random() * 3) + 3.5,
        }
      });

      setQuery('');
      setSuggestions([]);
    }else{
      alert('No matching game found.');
    }

  };

  return (
    <div className='bg-gray-800 flex w-full h-16 items-center justify-between px-6 py-4 shadow-md'>
      <Link to="/" className=''>
        <img 
          src={logo}
          className='size-[80px] md:size-[100px] mt-6 mr-24'
        />
      </Link>
      <form className='relative flex items-center focus-within:bg-opacity-30 ml-56 py-1'
            onSubmit={handleSearchSubmit}
      >
        <input type='text'
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               className='h-9 bg-gray-900 px-2 py-2 pl-2 pr-3 text-white  border border-white opacity-40 rounded-md focus:outline-none placeholder-white placeholder-opacity-70 w-[500px]'
               placeholder='Search Games...'
        />        
      
      <button type='submit' className=' h-9 w-9 flex items-center border border-white rounded-md justify-center p-2 rounded hover:bg-black opacity-50 transition'>
          <ImSearch className='h-5 w-5 text-white'/>
      </button>
      {suggestions.length > 0 && (
          <div className="absolute top-full mt-2 bg-white bg-opacity-90 text-black rounded-md shadow-lg w-[500px] max-h-[200px] overflow-y-auto z-50">
            {suggestions.map((game) => (
              <div
                key={game.id}
                onClick={() => handleSelect(game)}
                className="p-2 hover:bg-gray-400 cursor-pointer text-sm"
              >
                {game.title}
              </div>
            ))}
          </div>
        )}
      </form>
      <NavbarButtons user={user} />
    </div>
  )
}

export default Navbar;